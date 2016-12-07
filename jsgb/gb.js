/// <reference path="jquery.js"/>

//  メモ
//      相対的にジャンプさせるときは、その命令自身を読み込んだ後のプログラムカウンタの値を基準にする

//  ログ
//      2012-05-02
//      GBDK: galaxy.gb（解決済み）
//          どこかからRST 38h(0xFF)が実行された後
//          スタックが伸び続けてメモリが全体的に0x0039に書き換わり、
//          プログラムカウンタが全体を回る感じの無限ループが起きる。
//          （追記：POPするときのアドレスの指定が間違っていたのが原因でした）
//          （追記：JRで飛ぶときの飛び先がずれていて余分にPUSHさせたりすると同じ現象が起きました。
//                  今後も似たようなミスが出てきそうな気がするのでメモ）
//      ■ 課題
//          メソッド名からオペレーションが推測できなかった（逆も然り）
//          16bitレジスタでアドレスを指定してロードする命令と16bitレジスタのロード命令の区別が付かなかった
//      ■ 変えたい点
//          レジスタの命名規則
//              フラグは今のまま
//              レジスタは接頭辞としてRを付けた方が良さそう
//          オペレーションの命名規則: NAME_(%1)_(%2)
//              %1: オペランドの構成
//                  ソースはs、デスティネーションはd、16bitならss, ddのように。
//              %2: オペランドの種類
//                  実際のレジスタだったら（RA, RB, ...）、即値（n, これも16bitならnnみたいにする）
//          条件付きジャンプ、コール、リターンなど
//              フラグ自体は変化しないので呼び出し側から引数として値を渡す
//          値が変化しないものは引数として渡す（ビット系命令、条件付き……、リセット）

//
var rom;
var mem = new Array(0x10000);
var cartridge = [];
var run_timer = undefined;
var cpu = new CPU;
var main_disp, vram_disp, vram_tile_disp, vram_window_disp;

var Drawer = function (view) {
    this.canvas = view.getContext('2d');
    this.width = gameboy.width;
    this.height = gameboy.height;
    this.update_image_data();
};
Drawer.prototype = {
    set_width: function (width) {
        this.width = width;
    },
    set_height: function (height) {
        this.height = height;
    },
    update_image_data: function () {
        this.image_data = this.canvas.createImageData(this.width, this.height);
        this.display = this.image_data.data;
    },
    set: function (x, y, type, trans) {
        if (trans) return;
        var ind = (x + y * this.width) * 4;
        var r = [250, 200 - 20, 150 - 40, 100 - 60];
        var g = [255, 195 - 20, 145 - 40, 95 - 60];
        var b = [245, 185 - 20, 135 - 40, 85 - 60];
        this.display[ind + 0] = r[type];
        this.display[ind + 1] = g[type];
        this.display[ind + 2] = b[type];
        this.display[ind + 3] = 255;
    },
    get: function (x, y) {
        var ind = (x + y * this.width) * 4;
        var r = [250, 200 - 20, 150 - 40, 100 - 60];
        var g = [255, 195 - 20, 145 - 40, 95 - 60];
        var b = [245, 185 - 20, 135 - 40, 85 - 60];
        for (var i = 0; i < 4; ++i) {
            if (r[i] == this.display[ind + 0] && g[i] == this.display[ind + 1] && b[i] == this.display[ind + 2]) {
                return i;
            }
        }
        return 0;
    },
    update: function () {
        this.canvas.putImageData(this.image_data, 0, 0);
    }
};

// utilfunc
function to_hex(b, s) {
    var res = '';
    var t = b;
    for (var i = 0; i < (s == undefined ? 2 : 4); ++i) {
        res = parseInt(t & 0x0f).toString(16).toUpperCase() + res;
        t >>= 4;
    }
    return res;
}
function to_bin(n) {
    return ("00000000" + n.toString(2)).slice(-8);
}
function to_sign_8bit(n) {
    if ((n & 0x80) == 0x80) {
        n = ((~n) + 1) & 0xFF;
        n *= -1;
    }
    return n;
}
function debug_message(text) {
    console.log(text);
}
function debug_message_from_op(text) {
    // debug_message(text);
}

// manager
function load_rom() {
    var filename = $('#filename').val();
    var req = new XMLHttpRequest();
    req.open('GET', filename, false);
    req.overrideMimeType('text/plain; charset=x-user-defined');
    req.send(null);
    rom = new String(req.responseText);
    for (var i = 0; i < rom.length; i++) {
        var t = String(rom[i]).charCodeAt(0);
        cartridge[i] = t & 0xff;
    }

    cpu_init();
    memory_init();

    cartridge_state_reload();
    memory_state_reload();
    cpu_info_reload();
}
// NINTENDO
function run() {
    // load_rom();
    run_();
}
function step() {
    cpu_exec(cpu.reg.PC++);
    graphics.update();
    cpu_state_reload();
}
function step_noreload() {
    cpu_exec(cpu.reg.PC++);
}
function run_() {
    if (run_timer != undefined) return;
    var cnt = 0;
    var endFrame;

    run_timer = setInterval(function () {
        endFrame = false;
        cpu.clock_count = 0;
        while (cpu.clock_count < 8000) {
            if (run_timer == undefined) break;
            cpu_exec(cpu.reg.PC++);
            cpu.clock_count += cpu.state;
            endFrame = true;
        }
        system.DIV = (system.DIV + 1) & 0xFF;
        system.TIMA = (system.TIMA - 1) & 0xFF;
        system.TMA = (system.TMA + 1) & 0xFF;
        memory_dma_update();
        system.firing_interupts();
        graphics.update();
        cpu_state_reload();
    }, 16);
    setInterval(function () {
        VRAM_tile_viewer_update();
        VRAM_viewer_update();
    }, 100);
}
function stop() {
    clearInterval(run_timer);
    run_timer = undefined;
}
function cpu_state_reload() {
    cpu_info_reload();
}
function cpu_state_auto_reload() {
    setInterval(function () {
        cpu_info_reload();
    }, 1000);
}
function cpu_info_reload() {
    $('#cpu_state')
            .empty()
            .text(
                cpu.toString()
                + '\n--\nsystem:\n'
                + system.toString()
                + '\n--\ngraphics:\n'
                + graphics.toString()
                );
}
function cartridge_state_reload() {
    var dump = '# Cartridge Data\n' + 'ADDR : ';
    for (var i = 0; i < 16; ++i) {
        dump += to_hex(i) + ' ';
    }
    dump += '\n-------';
    for (var i = 0; i < 16; ++i) {
        dump += '---';
    }
    dump += '\n';
    for (var i = 0; i < cartridge.length; ) {
        var line = '';
        dump += to_hex(i, 4) + ' : ';
        for (var j = 0; j < 16; ++j, ++i) {
            dump += to_hex(cartridge[i]) + ' ';
            var b = String.fromCharCode(cartridge[i]);
            if (b != '\n' && b != '\r')
                line += b;
        }
        dump += ': ' + line;
        dump += '\n';
    }
    var info = '# Cartridge Info\n';
    info += cartridge_info.toString();
    $('#cartridge_state')
        .empty()
        .text(info + dump);
}
function memory_state_reload() {
    var mem_dump = 'ADDR : ';
    for (var i = 0; i < 16; ++i) {
        mem_dump += to_hex(i) + ' ';
    }
    mem_dump += '\n-------';
    for (var i = 0; i < 16; ++i) {
        mem_dump += '---';
    }
    mem_dump += '\n';
    for (var i = 0; i < 0x10000; ) {
        var line = '';
        mem_dump += to_hex(i, 4) + ' : ';
        for (var j = 0; j < 16; ++j, ++i) {
            var d = memory_read_8bit(i);
            mem_dump += to_hex(d) + ' ';
            var b = String.fromCharCode(d);
            if (b != '\n' && b != '\r')
                line += b;
        }
        mem_dump += ': ' + line;
        mem_dump += '\n';
    }
    $('#memory_state')
        .empty()
        .text('# Memory \n' + mem_dump);
}

function cpu_init() {
    cpu.reg.A = 0x01; // depend on Hardware type
    cpu.reg.FZ = 1;
    cpu.reg.FN = 0;
    cpu.reg.FH = 1;
    cpu.reg.FC = 1;
    cpu.reg.BC = 0x0013;
    cpu.reg.DE = 0x00D8;
    cpu.reg.HL = 0x014D;
    cpu.reg.SP = 0xFFFE;
    cpu.reg.PC = 0x0100;
}
function cpu_exec(pc) {
    var opcode = memory_read_8bit(pc);
    // debug_message('PC: ' + to_hex(pc,'')+', cpu_exec: ' +  to_hex(opcode));
    cpu.code(opcode);
    cpu.clock_count += cpu.state;
}

// gameboy
var gameboy = {
    width: 160,
    height: 144
};

// system
var system = {
    P1: 0,
    SB: 0,
    SC: 0,
    DIV: 0,
    TIMA: 0,
    TMA: 0,
    TAC: 0,
    DMA: 0,
    IME: 0,

    // interrupt
    IE_VBLANK: 0,
    IE_LCD_STAT: 0,
    IE_TIMER: 0,
    IE_SERIAL: 0,
    IE_JOYPAD: 0,
    IF_VBLANK: 0,
    IF_LCD_STAT: 0,
    IF_TIMER: 0,
    IF_SERIAL: 0,
    IF_JOYPAD: 0,

    toString: function () {
        function a(n) {
            return '0x' + ('00' + n.toString(16)).slice(-2);
        }
        return ''
                + 'P1: ' + a(this.P1) + ', '
                + 'SB: ' + a(this.SB) + ', '
                + 'SC: ' + a(this.SC) + ', '
                + 'DIV: ' + a(this.DIV) + '\n'
                + 'TIMA: ' + a(this.TIMA) + ', '
                + 'TMA: ' + a(this.TMA) + ', '
                + 'TAC: ' + a(this.TAC) + ', '
                + 'IF: ' + a(this.IF) + ', '
                + 'IE: ' + a(this.IE) + '\n'
                + 'DMA: ' + a(this.DMA) + ', '
                + 'Interrupts: '
                + 'IME: ' + this.IME + ', '
                + 'VBLANK: ' + this.IF_VBLANK + ', '
                + 'LCD_STAT: ' + this.IF_LCD_STAT + ', '
                + 'SERIAL: ' + this.IF_SERIAL + ', '
                + 'TIMER: ' + this.IF_TIMER + ', '
                + 'JOYPAD: ' + this.IF_JOYPAD;
    },
    firing_interupts: function () {
        if (this.IME == 0) return;
        this.IF_VBLANK = 1;
        cpu.op.CALLnn_interrupt(0x0040);
        this.IF_VBLANK = 0;
    }
};
(function init_getter_setter() {
    // getter
    system.__defineGetter__('IE', function () {
        return (this.IE_VBLANK << 0)
            | (this.IE_LCD_STAT << 1)
            | (this.IE_TIMER << 2)
            | (this.IE_SERIAL << 3)
            | (this.IE_JOYPAD << 4);
    });
    system.__defineGetter__('IF', function () {
        return (this.IF_VBLANK << 0)
            | (this.IF_LCD_STAT << 1)
            | (this.IF_TIMER << 2)
            | (this.IF_SERIAL << 3)
            | (this.IF_JOYPAD << 4);
    });
    // setter
    system.__defineSetter__('IE', function (x) {
        this.IE_VBLANK = (x & (1 << 0)) >> 0;
        this.IE_LCD_STAT = (x & (1 << 1)) >> 1;
        this.IE_TIMER = (x & (1 << 2)) >> 2;
        this.IE_SERIAL = (x & (1 << 3)) >> 3;
        this.IE_JOYPAD = (x & (1 << 4)) >> 4;
    });
    system.__defineSetter__('IF', function (x) {
        this.IF_VBLANK = (x & (1 << 0)) >> 0;
        this.IF_LCD_STAT = (x & (1 << 1)) >> 1;
        this.IF_TIMER = (x & (1 << 2)) >> 2;
        this.IF_SERIAL = (x & (1 << 3)) >> 3;
        this.IF_JOYPAD = (x & (1 << 4)) >> 4;
    });
})();

// Graphics
var graphics = {
    running: 0, // LCDC bit7
    window_tilemap: 0, // LCDC bit6
    show_window: 0, // LCDC bit5
    area: 0, // LCDC bit4
    bg_tilemap: 0, // LCDC bit3
    sprite_size: 0, // LCDC bit2
    show_sprite: 0, // LCDC bit1
    show_window: 0, // LCDC bit0

    STAT: 0x00,
    SCY: 0x00,
    SCX: 0x00,
    LY: 0x00,
    LYC: 0x00,
    BGP: 0xFC,
    OBP0: 0xFF,
    OBP1: 0xFF,
    WY: 0x00,
    WX: 0x00,

    tiles: [],
    tiles_number: 0,
    window_tiles: [],
    window_tiles_number: 0,
    sprite_tiles: [],
    sprite_tiles_number: 0,

    toString: function () {
        return ''
                + 'LCDC: ' + this.LCDC.toString(16) + ', '
                + 'STAT: ' + this.STAT.toString(16) + ', '
                + 'SCY: ' + this.SCY.toString(16) + ', '
                + 'SCX: ' + this.SCX.toString(16) + ', '
                + 'LY: ' + this.LY.toString(16) + ', '
                + 'LYC: ' + this.LYC.toString(16) + '\n'
                + 'BGP: ' + this.BGP.toString(16) + ', '
                + 'OBP0: ' + this.OBP0.toString(16) + ', '
                + 'OBP1: ' + this.OBP1.toString(16) + ', '
                + 'WY: ' + this.WY.toString(16) + ', '
                + 'WX: ' + this.WX.toString(16) + '';
    },
    set_palette: function (x, y, t) {
        this.palette_data[y][x] = t;
    },
    get_tile: function (addr, height) {
        if (height == undefined) height = 8;
        var res = [];
        var ind = 0;
        for (var i = 0; i < 0x10; ) {
            for (var j = 0; j < height; ++j, i += 2) {
                var a = memory_read_8bit(addr + i);
                var b = memory_read_8bit(addr + i + 1);
                var c = to_tileline(a, b);
                res[ind++] = c;
            }
        }
        return res;
    },
    update: function () {
        this.tiles = [];
        this.tiles_number = 0;

        // sprite tiles
        this.sprite_tiles = new Array(256);
        this.sprite_tiles_number = 0;
        var flag = this.sprite_size == 0;
        for (var i = 0x8000; i < 0x8800; i += 0x10) {
            this.sprite_tiles[this.sprite_tiles_number] = this.get_tile(i, (flag ? 8 : 16));
            this.tiles[this.tiles_number++] = this.sprite_tiles[this.sprite_tiles_number++];
        }
        for (var i = 0x8800; i < 0x9000; i += 0x10) {
            this.sprite_tiles[this.sprite_tiles_number] = this.get_tile(i, (flag ? 8 : 16));
            this.tiles[this.tiles_number++] = this.sprite_tiles[this.sprite_tiles_number++];
        }

        // winodw tiles
        this.window_tiles = [];
        this.window_tiles_number = 0;
        for (var i = 0x9000; i < 0x9800; i += 0x10) {
            this.window_tiles[this.window_tiles_number] = this.get_tile(i);
            this.tiles[this.tiles_number++] = this.window_tiles[this.window_tiles_number++];
        }
        for (var i = 0x8800; i < 0x9000; i += 0x10) {
            this.window_tiles[this.window_tiles_number] = this.get_tile(i);
            this.tiles[this.tiles_number++] = this.window_tiles[this.window_tiles_number++];
        }

        // background
        for (var i = 0; i < gameboy.height; ++i) {
            for (var j = 0; j < gameboy.width; ++j) {
                main_disp.set(j, i, vram_disp.get((this.SCX + j) % vram_disp.width, (this.SCY + i) % vram_disp.height));
            }
        }
        // window
        var xx = graphics.WX - 7;
        var yy = graphics.WY;
        for (var i = 0; i < 8 * 18; ++i) {
            for (var j = 0; j < 8 * 20; ++j) {
                if (xx + j >= gameboy.width || yy + i >= gameboy.height) continue;
                main_disp.set(xx + j, yy + i, vram_window_disp.get(j, i));
            }
        }
        // sprites
        function get_sprite_options(b) {
            return {
                priority: (b & (1 << 7)) >> 7,
                y_flip: (b & (1 << 6)) >> 6,
                x_flip: (b & (1 << 5)) >> 5,
                palette: (b & (1 << 4)) >> 4
            };
        }
        for (var i = 0xFE00; i < 0xFEA0; i += 4) {
            var yy = parseInt(memory_read_8bit(i));
            var xx = parseInt(memory_read_8bit(i + 1));
            if (yy == 0 && xx == 0) continue;
            yy -= 16;
            xx -= 8;
            var tile = memory_read_8bit(i + 2);
            var opt = get_sprite_options(memory_read_8bit(i + 3));
            for (var y = 0; y < (flag ? 8 : 16); ++y) {
                for (var x = 0; x < 8; ++x) {
                    main_disp.set(xx + x, yy + y, this.sprite_tiles[tile][y][x], (this.sprite_tiles[tile][y][x] == 0));
                }
            }
        }
        main_disp.update();
    }
};
(function () {
    graphics.__defineGetter__('LCDC', function () {
        return (graphics.running << 7)
            | (graphics.window_tilemap << 6)
            | (graphics.show_window << 5)
            | (graphics.area << 4)
            | (graphics.bg_tilemap << 3)
            | (graphics.sprite_size << 2)
            | (graphics.show_sprite << 1)
            | (graphics.show_window << 0);
    });
    graphics.__defineSetter__('LCDC', function (x) {
        graphics.running = (x & 0x80) == 0x80 ? 1 : 0;
        graphics.window_tilemap = (x & 0x40) == 0x40 ? 1 : 0;
        graphics.show_window = (x & 0x20) == 0x20 ? 1 : 0;
        graphics.area = (x & 0x10) == 0x10 ? 1 : 0;
        graphics.bg_tilemap = (x & 0x08) == 0x08 ? 1 : 0;
        graphics.sprite_size = (x & 0x04) == 0x04 ? 1 : 0;
        graphics.show_sprite = (x & 0x02) == 0x02 ? 1 : 0;
        graphics.show_window = (x & 0x01) == 0x01 ? 1 : 0;
    });
})();

// Memory
// ignore MBC
function memory_init() {
    // cartridge data
    for (var i = 0x0000; i < 0x8000; ++i) {
        memory_write_8bit(i, cartridge[i]);
    }
    // VRAM
    for (var i = 0x8000; i < 0xA000; ++i) {
        memory_write_8bit(i, 0x00);
    }
    // nothing
    for (var i = 0xA000; i < 0xC000; ++i) {
        memory_write_8bit(i, 0x00);
    }
    // RAM
    for (var i = 0xC000; i < 0xE000; ++i) {
        memory_write_8bit(i, 0x00);
    }
    // disabled
    for (var i = 0xE000; i < 0xFE00; ++i) {
        memory_write_8bit(i, 0x00);
    }
    // System
    for (var i = 0xFE00; i < 0x10000; ++i) {
        memory_write_8bit(i, 0x00);
    }

    memory_write_8bit(0xFF05, 0x00);
    memory_write_8bit(0xFF06, 0x00);
    memory_write_8bit(0xFF07, 0x00);
    memory_write_8bit(0xFF40, 0x91);
    memory_write_8bit(0xFF42, 0x00);
    memory_write_8bit(0xFF43, 0x00);
    memory_write_8bit(0xFF45, 0x00);
    memory_write_8bit(0xFF47, 0xFC);
    memory_write_8bit(0xFF48, 0xFF);
    memory_write_8bit(0xFF49, 0xFF);
    memory_write_8bit(0xFF4A, 0x00);
    memory_write_8bit(0xFF4B, 0x00);
    memory_write_8bit(0xFFFF, 0x00);
}
function memory_read_8bit(addr) {
    if ((addr & 0xFF00) == 0xFF00) {
        switch (addr & 0x00FF) {
            case 0x00:
                return system.P1;
            case 0x01:
                return system.SB;
            case 0x02:
                return system.SC;
            case 0x04:
                return system.DIV;
            case 0x05:
                return system.TIMA;
            case 0x06:
                return system.TMA;
            case 0x07:
                return system.TAC;
            case 0x0F:
                return system.IF;
            case 0x40:
                return graphics.LCDC;
            case 0x41:
                return graphics.STAT;
            case 0x42:
                return graphics.SCY;
            case 0x43:
                return graphics.SCX;
            case 0x44:
                return graphics.LY;
            case 0x45:
                return graphics.LYC;
            case 0x46:
                return system.DMA;
            case 0x47:
                return graphics.BGP;
            case 0x48:
                return graphics.OBP0;
            case 0x49:
                return graphics.OBP1;
            case 0x4A:
                return graphics.WY;
            case 0x4B:
                return graphics.WX;
            case 0xFF:
                return system.IE;
        }
    } else if (addr >= 0xC000 && addr < 0xDE00) {
        return mem[addr];
    } else if (addr >= 0xE000 && addr < 0xFE00) {
        return mem[addr - 0x2000];
    }
    return mem[addr];
}
function memory_write_8bit(addr, data) {
    data &= 0xFF;
    if ((addr & 0xFF00) == 0xFF00) {
        switch (addr & 0x00FF) {
            case 0x00:
                system.P1 = data; return;
            case 0x01:
                system.SB = data; return;
            case 0x02:
                system.SC = data; return;
            case 0x04:
                system.DIV = 0; return;
            case 0x05:
                system.TIMA = data; return;
            case 0x06:
                system.TMA = data; return;
            case 0x07:
                system.TAC = data; return;
            case 0x0F:
                system.IF = data; return;
            case 0x40:
                graphics.LCDC = data; return;
            case 0x41:
                graphics.STAT = data; return;
            case 0x42:
                graphics.SCY = data; return;
            case 0x43:
                graphics.SCX = data; return;
            case 0x44:
                graphics.LY = 0x00; return; // reset
            case 0x45:
                graphics.LYC = data; return;
            case 0x46:
                system.DMA = data; return;
            case 0x47:
                graphics.BGP = data; return;
            case 0x48:
                graphics.OBP0 = data; return;
            case 0x49:
                graphics.OBP1 = data; return;
            case 0x4A:
                graphics.WY = data; return;
            case 0x4B:
                graphics.WX = data; return;
            case 0xFF:
                system.IE = data; return;
        }
    } else if (addr >= 0xC000 && addr < 0xDE00) {
        mem[addr] = data;
    } else if (addr >= 0xE000 && addr < 0xFE00) {
        mem[addr - 0x2000] = data;
    }
    mem[addr] = data;
}
function memory_read_16bit(addr) {
    return memory_read_8bit(addr) + (memory_read_8bit(addr + 1) << 8);
}
function memory_write_16bit(addr, data) {
    memory_write_8bit(addr, data & 0xFF);
    memory_write_8bit(addr + 1, (data & 0xFF00) >> 8);
}
function memory_dma_update() {
    var offset = system.DMA << 8;
    for (var i = 0; i < 0xA0; i += 2) {
        memory_write_16bit(0xFE00 + i, memory_read_16bit(offset + i));
    }
}

var cartridge_info = {
    get_cartridge_title: function () {
        var ret = new String();
        for (var i = 0x0134; i <= 0x0142; ++i) {
            ret += String.fromCharCode(mem[i]);
        }
        return ret;
    },
    check_color_cartridge: function () {
        return mem[0x0143] == 0x80;
    },
    get_color_cartridge: function () {
        return this.check_color_cartridge() ? 'COLOR' : 'NOT COLOR CARTRIDGE';
    },
    check_sgb: function () {
        return mem[0x0146] == 0x03;
    },
    get_sgb: function () {
        return this.check_sgb() ? 'Super GB' : 'GB';
    },
    get_cartridge_type: function () {
        switch (mem[0x0147]) {
            case 0x00: return 'ROM ONLY';
            case 0x01: return 'ROM+MBC1';
            case 0x02: return 'ROM+MBC1+RAM';
            case 0x03: return 'ROM+MBC1+RAM+BATTERY';
            case 0x05: return 'ROM+MBC2';
            case 0x06: return 'ROM+MBC2+BATTERY';
            case 0x08: return 'ROM+RAM';
            case 0x09: return 'ROM+RAM+BATTERY';
            case 0x0B: return 'ROM+MMM01';
            case 0x0C: return 'ROM+MMM01+SRAM';
            case 0x0D: return 'ROM+MMM01+SRAM+BATTERY';
            case 0x0F: return 'ROM+MBC3+TIMER+BATTERY';
            case 0x10: return 'ROM+MBC3+TIMER+RAM+BATTERY';
            case 0x11: return 'ROM+MBC3';
            case 0x12: return 'ROM+MBC3+RAM';
            case 0x13: return 'ROM+MBC3+RAM+BATTERY';
            case 0x19: return 'ROM+MBC5';
            case 0x1A: return 'ROM+MBC5+RAM';
            case 0x1B: return 'ROM+MBC5+RAM+BATTERY';
            case 0x1C: return 'ROM+MBC5+RUMBLE';
            case 0x1D: return 'ROM+MBC5+RUMBLE+SRAM';
            case 0x1E: return 'ROM+MBC5+RUMBLE+SRAM+BATTERY';
            case 0x1F: return 'Pocket Camera';
            case 0xFD: return 'Bandai TAMA5';
            case 0xFE: return 'Hudson HuC3';
            case 0xFF: return 'ROM+HuC1+RAM+BATTERY';
        }
        return 'NONE';
    },
    get_cartridge_rom_size: function () {
        switch (mem[0x0148]) {
            case 0x00: return '32KB';
            case 0x01: return '64KB';
            case 0x02: return '128KB';
            case 0x03: return '256KB';
            case 0x04: return '512KB';
            case 0x05: return '1MB';
            case 0x06: return '2MB';
            case 0x52: return '1.1MB';
            case 0x53: return '1.2MB';
            case 0x54: return '1.5MB';
        }
        return 'UNKNOWN';
    },
    get_cartridge_ram_size: function () {
        switch (mem[0x0149]) {
            case 0x00: return 'NONE';
            case 0x01: return '2KB';
            case 0x02: return '8KB';
            case 0x03: return '32KB';
            case 0x04: return '128KB';
        }
        return 'UNKNOWN';
    },
    get_region: function () {
        return mem[0x014A] == 0x00 ? 'for JAPAN' : 'for not JAPAN';
    },
    toString: function () {
        var ret = new String;
        function a(text, data) {
            ret += text + data + '\n';
        }
        a('Title: ', this.get_cartridge_title());
        a('SGB: ', this.get_sgb());
        a('Color: ', this.get_color_cartridge());
        a('Type: ', this.get_cartridge_type());
        a('Size: ', this.get_cartridge_rom_size());
        a('RAM_Size: ', this.get_cartridge_ram_size());
        a('Region: ', this.get_region());
        return ret;
    }
}

function to_tileline(a, b) {
    var res = '';
    for (var i = 0; i < 8; ++i) {
        var aa = (a & (1 << i)) >> i;
        var bb = (b & (1 << i)) >> i;
        var cc = (aa << 1) | bb;
        res = cc.toString() + res;
    }
    return res;
}

function VRAM_viewer_update() {
    var xx = 0;
    var yy = 0;
    for (var i = 0x9800; i < 0x9C00; ++i) {
        var ind = memory_read_8bit(i);
        for (var y = 0; y < 8; ++y) {
            for (var x = 0; x < 8; ++x) {
                vram_disp.set(xx * 8 + x, yy * 8 + y, graphics.window_tiles[ind][y][x]);
            }
        }
        xx++;
        if (xx >= 0x20) {
            xx = 0;
            yy++;
        }
    }
    var xx = 0;
    var yy = 0;
    for (var i = 0x9C00; i < 0x9E00; ++i) {
        var ind = memory_read_8bit(i);
        for (var y = 0; y < 8; ++y) {
            for (var x = 0; x < 8; ++x) {
                vram_window_disp.set(xx * 8 + x, yy * 8 + y, graphics.window_tiles[ind][y][x]);
            }
        }
        xx++;
        if (xx >= 0x20) {
            xx = 0;
            yy++;
        }
    }
    vram_window_disp.update();
    vram_disp.update();
}
function VRAM_tile_viewer_update() {
    var xx = 0;
    var yy = 0;
    for (var i = 0; i < graphics.tiles_number; ++i) {
        for (var y = 0; y < 8; ++y) {
            for (var x = 0; x < 8; ++x) {
                vram_tile_disp.set(xx * 8 + x, yy * 8 + y, graphics.tiles[i][y][x]);
            }
        }
        xx++;
        if (xx >= 0x20) {
            xx = 0;
            yy++;
        }
    }
    vram_tile_disp.update();
}

$(document).ready(function () {
    var view = document.getElementById('view');
    $(view)
        .attr('width', gameboy.width + 'px')
        .attr('height', gameboy.height + 'px')
        .css({ outline: '1px solid #EEE' });
    main_disp = new Drawer(view);
    for (var i = 0; i < gameboy.height; ++i) {
        for (var j = 0; j < gameboy.width; ++j) {
            main_disp.set(j, i, 0);
        }
    }
    main_disp.update();

    var vram_view = document.getElementById('vram_view');
    $(vram_view)
        .attr('width', '256px')
        .attr('height', '256px')
        .css({ outline: '1px solid #EEE' });
    vram_disp = new Drawer(vram_view);
    vram_disp.set_width(256);
    vram_disp.set_height(256);
    vram_disp.update_image_data();
    for (var i = 0; i < 256; ++i) {
        for (var j = 0; j < 256; ++j) {
            vram_disp.set(j, i, 0);
        }
    }
    vram_disp.update();

    var vram_window = document.getElementById('vram_window');
    $(vram_window)
        .attr('width', '256px')
        .attr('height', '256px')
        .css({ outline: '1px solid #EEE' });
    vram_window_disp = new Drawer(vram_window);
    vram_window_disp.set_width(256);
    vram_window_disp.set_height(256);
    vram_window_disp.update_image_data();
    for (var i = 0; i < 256; ++i) {
        for (var j = 0; j < 256; ++j) {
            vram_window_disp.set(j, i, 0);
        }
    }
    vram_window_disp.update();

    var vram_tile_view = document.getElementById('vram_tile_view');
    $(vram_tile_view)
        .attr('width', '256px')
        .attr('height', '256px')
        .css({ outline: '1px solid #EEE' });
    vram_tile_disp = new Drawer(vram_tile_view);
    vram_tile_disp.set_width(256);
    vram_tile_disp.set_height(256);
    vram_tile_disp.update_image_data();
    for (var i = 0; i < 256; ++i) {
        for (var j = 0; j < 256; ++j) {
            vram_tile_disp.set(j, i, 0);
        }
    }
    vram_tile_disp.update();

    $('article textarea')
        .width(700)
        .height(100);
    $('#register_state')
        .height(80);

    // bind events
    $('#run').click(run);
    $('#step').click(step);
    $('#load').click(load_rom);
    $('#stop').click(stop);
    $('#memory_state_reload').click(memory_state_reload);
    $('#cpu_state_reload').click(cpu_state_reload);
    $('#cpu_state_auto_reload').click(cpu_state_auto_reload);

    load_rom();
    run();
});
