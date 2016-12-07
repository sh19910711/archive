
function check_carry() {
    var d1 = arguments[0];
    var d2 = arguments[1];
    var d3 = arguments[2] == undefined ? 0 : arguments[2];
    return d1 + d2 + d3 > 0xFF;
}
function check_carry_sub() {
    var d1 = arguments[0];
    var d2 = arguments[1];
    var d3 = arguments[2] == undefined ? 0 : arguments[2];
    return d1 < d2 + d3;
}
function check_carry_16bit() {
    var d1 = arguments[0] & 0xFFFF;
    var d2 = arguments[1] & 0xFFFF;
    var d3 = arguments[2] == undefined ? 0 : arguments[2];
    return d1 + d2 + d3 > 0xFFFF;
}
function check_half_carry() {
    var d1 = arguments[0];
    var d2 = arguments[1];
    var d3 = arguments[2] == undefined ? 0 : arguments[2];
    return d1 + d2 + d3 > 0x0F;
}
function check_half_carry_sub() {
    var d1 = arguments[0] & 0x0F;
    var d2 = arguments[1] & 0x0F;
    var d3 = arguments[2] == undefined ? 0 : arguments[2];
    return d1 < d2 + d3;
}
function check_half_carry_16bit() {
    var d1 = arguments[0] & 0x0FFF;
    var d2 = arguments[1] & 0x0FFF;
    var d3 = arguments[2] == undefined ? 0 : arguments[2];
    return d1 + d2 + d3 > 0x0FFF;
}

// CPU
//  check: ~x => (~x)&0xFF etc...
var CPU = function () {
    var self = this;
    this.clock_count = 0;
    this.state = 0;
    this.op = {
        // 8bit loads ( register <= register )
        LDrr_aa: function () {
            self.reg.A = self.reg.A;
            self.state = 4;
        },
        LDrr_ab: function () {
            self.reg.A = self.reg.B;
            self.state = 4;
        },
        LDrr_ad: function () {
            self.reg.A = self.reg.D;
            self.state = 4;
        },
        LDrr_ah: function () {
            self.reg.A = self.reg.H;
            self.state = 4;
        },
        LDrr_ac: function () {
            self.reg.A = self.reg.C;
            self.state = 4;
        },
        LDrr_ae: function () {
            self.reg.A = self.reg.E;
            self.state = 4;
        },
        LDrr_al: function () {
            self.reg.A = self.reg.L;
            self.state = 4;
        },
        LDrr_ba: function () {
            self.reg.B = self.reg.A;
            self.state = 4;
        },
        LDrr_bb: function () {
            self.reg.B = self.reg.B;
            self.state = 4;
        },
        LDrr_bd: function () {
            self.reg.B = self.reg.D;
            self.state = 4;
        },
        LDrr_bh: function () {
            self.reg.B = self.reg.H;
            self.state = 4;
        },
        LDrr_bc: function () {
            self.reg.B = self.reg.C;
            self.state = 4;
        },
        LDrr_be: function () {
            self.reg.B = self.reg.E;
            self.state = 4;
        },
        LDrr_bl: function () {
            self.reg.B = self.reg.L;
            self.state = 4;
        },
        LDrr_da: function () {
            self.reg.D = self.reg.A;
            self.state = 4;
        },
        LDrr_db: function () {
            self.reg.D = self.reg.B;
            self.state = 4;
        },
        LDrr_dd: function () {
            self.reg.D = self.reg.D;
            self.state = 4;
        },
        LDrr_dh: function () {
            self.reg.D = self.reg.H;
            self.state = 4;
        },
        LDrr_dc: function () {
            self.reg.D = self.reg.C;
            self.state = 4;
        },
        LDrr_de: function () {
            self.reg.D = self.reg.E;
            self.state = 4;
        },
        LDrr_dl: function () {
            self.reg.D = self.reg.L;
            self.state = 4;
        },
        LDrr_ha: function () {
            self.reg.H = self.reg.A;
            self.state = 4;
        },
        LDrr_hb: function () {
            self.reg.H = self.reg.B;
            self.state = 4;
        },
        LDrr_hd: function () {
            self.reg.H = self.reg.D;
            self.state = 4;
        },
        LDrr_hh: function () {
            self.reg.H = self.reg.H;
            self.state = 4;
        },
        LDrr_hc: function () {
            self.reg.H = self.reg.C;
            self.state = 4;
        },
        LDrr_he: function () {
            self.reg.H = self.reg.E;
            self.state = 4;
        },
        LDrr_hl: function () {
            self.reg.H = self.reg.L;
            self.state = 4;
        },
        LDrr_ca: function () {
            self.reg.C = self.reg.A;
            self.state = 4;
        },
        LDrr_cb: function () {
            self.reg.C = self.reg.B;
            self.state = 4;
        },
        LDrr_cd: function () {
            self.reg.C = self.reg.D;
            self.state = 4;
        },
        LDrr_ch: function () {
            self.reg.C = self.reg.H;
            self.state = 4;
        },
        LDrr_cc: function () {
            self.reg.C = self.reg.C;
            self.state = 4;
        },
        LDrr_ce: function () {
            self.reg.C = self.reg.E;
            self.state = 4;
        },
        LDrr_cl: function () {
            self.reg.C = self.reg.L;
            self.state = 4;
        },
        LDrr_ea: function () {
            self.reg.E = self.reg.A;
            self.state = 4;
        },
        LDrr_eb: function () {
            self.reg.E = self.reg.B;
            self.state = 4;
        },
        LDrr_ed: function () {
            self.reg.E = self.reg.D;
            self.state = 4;
        },
        LDrr_eh: function () {
            self.reg.E = self.reg.H;
            self.state = 4;
        },
        LDrr_ec: function () {
            self.reg.E = self.reg.C;
            self.state = 4;
        },
        LDrr_ee: function () {
            self.reg.E = self.reg.E;
            self.state = 4;
        },
        LDrr_el: function () {
            self.reg.E = self.reg.L;
            self.state = 4;
        },
        LDrr_la: function () {
            self.reg.L = self.reg.A;
            self.state = 4;
        },
        LDrr_lb: function () {
            self.reg.L = self.reg.B;
            self.state = 4;
        },
        LDrr_ld: function () {
            self.reg.L = self.reg.D;
            self.state = 4;
        },
        LDrr_lh: function () {
            self.reg.L = self.reg.H;
            self.state = 4;
        },
        LDrr_lc: function () {
            self.reg.L = self.reg.C;
            self.state = 4;
        },
        LDrr_le: function () {
            self.reg.L = self.reg.E;
            self.state = 4;
        },
        LDrr_ll: function () {
            self.reg.L = self.reg.L;
            self.state = 4;
        },
        // 8bit load ( register <= value )
        LDrn_a: function () {
            self.reg.A = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
        },
        LDrn_b: function () {
            self.reg.B = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
        },
        LDrn_d: function () {
            self.reg.D = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
        },
        LDrn_h: function () {
            self.reg.H = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
        },
        LDrn_c: function () {
            self.reg.C = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
        },
        LDrn_e: function () {
            self.reg.E = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
        },
        LDrn_l: function () {
            self.reg.L = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
        },
        // 8bit load
        LDrHL_a: function () {
            self.reg.A = memory_read_8bit(self.reg.HL);
            self.state = 8;
        },
        LDrHL_b: function () {
            self.reg.B = memory_read_8bit(self.reg.HL);
            self.state = 8;
        },
        LDrHL_d: function () {
            self.reg.D = memory_read_8bit(self.reg.HL);
            self.state = 8;
        },
        LDrHL_h: function () {
            self.reg.H = memory_read_8bit(self.reg.HL);
            self.state = 8;
        },
        LDrHL_c: function () {
            self.reg.C = memory_read_8bit(self.reg.HL);
            self.state = 8;
        },
        LDrHL_e: function () {
            self.reg.E = memory_read_8bit(self.reg.HL);
            self.state = 8;
        },
        LDrHL_l: function () {
            self.reg.L = memory_read_8bit(self.reg.HL);
            self.state = 8;
        },
        // 8bit load
        LDHLr_a: function () {
            memory_write_8bit(self.reg.HL, self.reg.A);
            self.state = 8;
        },
        LDHLr_b: function () {
            memory_write_8bit(self.reg.HL, self.reg.B);
            self.state = 8;
        },
        LDHLr_d: function () {
            memory_write_8bit(self.reg.HL, self.reg.D);
            self.state = 8;
        },
        LDHLr_h: function () {
            memory_write_8bit(self.reg.HL, self.reg.H);
            self.state = 8;
        },
        LDHLr_c: function () {
            memory_write_8bit(self.reg.HL, self.reg.C);
            self.state = 8;
        },
        LDHLr_e: function () {
            memory_write_8bit(self.reg.HL, self.reg.E);
            self.state = 8;
        },
        LDHLr_l: function () {
            memory_write_8bit(self.reg.HL, self.reg.L);
            self.state = 8;
        },
        LDHLn: function () {
            memory_write_8bit(self.reg.HL, memory_read_8bit(self.reg.PC));
            self.reg.PC = self.reg.PC + 1;
            self.state = 16;
        },
        // 8bit loads
        LDAss_BC: function () {
            self.reg.A = memory_read_8bit(self.reg.BC);
            self.state = 8;
        },
        LDAss_DE: function () {
            self.reg.A = memory_read_8bit(self.reg.DE);
            self.state = 8;
        },
        LDAss_HL: function () {
            self.reg.A = memory_read_8bit(self.reg.HL);
            self.state = 8;
        },
        LDAss_nn: function () {
            self.reg.A = memory_read_8bit(memory_read_16bit(self.reg.PC));
            self.reg.PC = self.reg.PC + 2;
            self.state = 16;
        },
        LDddA_BC: function () {
            memory_write_8bit(self.reg.BC, self.reg.A);
            self.state = 8;
        },
        LDddA_DE: function () {
            memory_write_8bit(self.reg.DE, self.reg.A);
            self.state = 8;
        },
        LDddA_HL: function () {
            memory_write_8bit(self.reg.HL, self.reg.A);
            self.state = 8;
        },
        LDddA_nn: function () {
            memory_write_8bit(memory_read_16bit(self.reg.PC), self.reg.A);
            self.reg.PC = self.reg.PC + 2;
            self.state = 16;
        },
        // 8bit loads
        LDAC: function () {
            self.reg.A = memory_read_8bit(0xFF00 + self.reg.C);
            self.state = 8;
        },
        LDCA: function () {
            memory_write_8bit(0xFF00 + self.reg.C, self.reg.A);
            self.state = 8;
        },
        LDDAHL: function () {
            self.reg.A = memory_read_8bit(self.reg.HL);
            self.reg.HL = self.reg.HL - 1;
            self.state = 8;
        },
        LDDHLA: function () {
            memory_write_8bit(self.reg.HL, self.reg.A);
            self.reg.HL = self.reg.HL - 1;
            self.state = 8;
        },
        LDIAHL: function () {
            self.reg.A = memory_read_8bit(self.reg.HL);
            self.reg.HL = self.reg.HL + 1;
            self.state = 8;
        },
        LDIHLA: function () {
            memory_write_8bit(self.reg.HL, self.reg.A);
            self.reg.HL = self.reg.HL + 1;
            self.state = 8;
        },
        LDHnA: function () {
            memory_write_8bit(0xFF00 + memory_read_8bit(self.reg.PC), self.reg.A);
            self.reg.PC = self.reg.PC + 1;
            self.state = 12;
        },
        LDHAn: function () {
            self.reg.A = memory_read_8bit(0xFF00 + memory_read_8bit(self.reg.PC));
            self.reg.PC = self.reg.PC + 1;
            self.state = 12;
        },
        // 16bit loads
        LDddnn_BC: function () {
            self.reg.BC = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2;
            self.state = 12;
        },
        LDddnn_DE: function () {
            self.reg.DE = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2;
            self.state = 12;
        },
        LDddnn_HL: function () {
            self.reg.HL = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2;
            self.state = 12;
        },
        LDddnn_SP: function () {
            self.reg.SP = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2;
            self.state = 12;
        },
        LDnnSP: function () {
            memory_write_16bit(memory_read_16bit(self.reg.PC), self.reg.SP);
            self.reg.PC = self.reg.PC + 2;
            self.state = 20;
        },
        LDSPHL: function () {
            self.reg.SP = self.reg.HL;
            self.state = 8;
        },
        LDHLSPe: function () {
            var e = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            e = to_sign_8bit(e);
            self.reg.HL = self.reg.SP + e;
            self.state = 12;
            self.reg.FZ = 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry_16bit(self.reg.SP, e) ? 1 : 0; // TODO: check
            self.reg.FC = check_carry_16bit(self.reg.SP, e) ? 1 : 0; // TODO: check
        },
        // 16bit loads
        PUSH_BC: function () {
            memory_write_8bit(self.reg.SP - 1, self.reg.B);
            memory_write_8bit(self.reg.SP - 2, self.reg.C);
            self.reg.SP = self.reg.SP - 2;
            self.state = 16;
        },
        PUSH_DE: function () {
            memory_write_8bit(self.reg.SP - 1, self.reg.D);
            memory_write_8bit(self.reg.SP - 2, self.reg.E);
            self.reg.SP = self.reg.SP - 2;
            self.state = 16;
        },
        PUSH_HL: function () {
            memory_write_8bit(self.reg.SP - 1, self.reg.H);
            memory_write_8bit(self.reg.SP - 2, self.reg.L);
            self.reg.SP = self.reg.SP - 2;
            self.state = 16;
        },
        PUSH_AF: function () {
            memory_write_8bit(self.reg.SP - 1, self.reg.A);
            memory_write_8bit(self.reg.SP - 2, self.reg.F);
            self.reg.SP = self.reg.SP - 2;
            self.state = 16;
        },
        POP_BC: function () {
            self.reg.B = memory_read_8bit(self.reg.SP + 1);
            self.reg.C = memory_read_8bit(self.reg.SP);
            self.reg.SP = self.reg.SP + 2;
            self.state = 12;
        },
        POP_DE: function () {
            self.reg.D = memory_read_8bit(self.reg.SP + 1);
            self.reg.E = memory_read_8bit(self.reg.SP);
            self.reg.SP = self.reg.SP + 2;
            self.state = 12;
        },
        POP_HL: function () {
            self.reg.H = memory_read_8bit(self.reg.SP + 1);
            self.reg.L = memory_read_8bit(self.reg.SP);
            self.reg.SP = self.reg.SP + 2;
            self.state = 12;
        },
        POP_AF: function () {
            self.reg.A = memory_read_8bit(self.reg.SP + 1);
            self.reg.F = memory_read_8bit(self.reg.SP);
            self.reg.SP = self.reg.SP + 2;
            self.state = 12;
        },
        // 8bit ALUs
        ADDAr_A: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.A;
            self.reg.A = self.reg.A + self.reg.A;
            self.state = 4;
            self.reg.FZ = (d1 + d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2);
            self.reg.FC = check_carry(d1, d2);
        },
        ADDAr_B: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.B;
            self.reg.A = self.reg.A + self.reg.B;
            self.state = 4;
            self.reg.FZ = (d1 + d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2);
            self.reg.FC = check_carry(d1, d2);
        },
        ADDAr_D: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.D;
            self.reg.A = self.reg.A + self.reg.D;
            self.state = 4;
            self.reg.FZ = (d1 + d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2);
            self.reg.FC = check_carry(d1, d2);
        },
        ADDAr_H: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.H;
            self.reg.A = self.reg.A + self.reg.H;
            self.state = 4;
            self.reg.FZ = (d1 + d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2);
            self.reg.FC = check_carry(d1, d2);
        },
        ADDAr_C: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.C;
            self.reg.A = self.reg.A + self.reg.C;
            self.state = 4;
            self.reg.FZ = (d1 + d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2);
            self.reg.FC = check_carry(d1, d2);
        },
        ADDAr_E: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.E;
            self.reg.A = self.reg.A + self.reg.E;
            self.state = 4;
            self.reg.FZ = (d1 + d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2);
            self.reg.FC = check_carry(d1, d2);
        },
        ADDAr_L: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.L;
            self.reg.A = self.reg.A + self.reg.L;
            self.state = 4;
            self.reg.FZ = (d1 + d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2);
            self.reg.FC = check_carry(d1, d2);
        },
        ADDAn: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.PC);
            self.reg.A = self.reg.A + memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
            self.reg.FZ = (d1 + d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2);
            self.reg.FC = check_carry(d1, d2);
        },
        ADDAHL: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.HL);
            self.reg.A = self.reg.A + memory_read_8bit(self.reg.HL);
            self.state = 8;
            self.reg.FZ = (d1 + d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2);
            self.reg.FC = check_carry(d1, d2);
        },
        ADCAr_A: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.A;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A + self.reg.A + self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 + d2 + d3) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2, d3);
            self.reg.FC = check_carry(d1, d2, d3);
        },
        ADCAr_B: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.B;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A + self.reg.B + self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 + d2 + d3) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2, d3);
            self.reg.FC = check_carry(d1, d2, d3);
        },
        ADCAr_D: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.D;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A + self.reg.D + self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 + d2 + d3) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2, d3);
            self.reg.FC = check_carry(d1, d2, d3);
        },
        ADCAr_H: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.H;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A + self.reg.H + self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 + d2 + d3) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2, d3);
            self.reg.FC = check_carry(d1, d2, d3);
        },
        ADCAr_C: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.C;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A + self.reg.C + self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 + d2 + d3) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2, d3);
            self.reg.FC = check_carry(d1, d2, d3);
        },
        ADCAr_E: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.E;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A + self.reg.E + self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 + d2 + d3) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2, d3);
            self.reg.FC = check_carry(d1, d2, d3);
        },
        ADCAr_L: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.L;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A + self.reg.L + self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 + d2 + d3) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2, d3);
            self.reg.FC = check_carry(d1, d2, d3);
        },
        ADCAn: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.PC);
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A + memory_read_8bit(self.reg.PC) + self.reg.FC;
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
            self.reg.FZ = (d1 + d2 + d3) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2, d3);
            self.reg.FC = check_carry(d1, d2, d3);
        },
        ADCAHL: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.HL);
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A + memory_read_8bit(self.reg.HL) + self.reg.FC;
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
            self.reg.FZ = (d1 + d2 + d3) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry(d1, d2, d3);
            self.reg.FC = check_carry(d1, d2, d3);
        },
        SUBr_A: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.A;
            self.reg.A = self.reg.A - self.reg.A;
            self.state = 4;
            self.reg.FZ = (d1 - d2) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2);
            self.reg.FC = check_carry_sub(d1, d2);
        },
        SUBr_B: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.B;
            self.reg.A = self.reg.A - self.reg.B;
            self.state = 4;
            self.reg.FZ = (d1 - d2) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2);
            self.reg.FC = check_carry_sub(d1, d2);
        },
        SUBr_D: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.D;
            self.reg.A = self.reg.A - self.reg.D;
            self.state = 4;
            self.reg.FZ = (d1 - d2) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2);
            self.reg.FC = check_carry_sub(d1, d2);
        },
        SUBr_H: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.H;
            self.reg.A = self.reg.A - self.reg.H;
            self.state = 4;
            self.reg.FZ = (d1 - d2) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2);
            self.reg.FC = check_carry_sub(d1, d2);
        },
        SUBr_C: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.C;
            self.reg.A = self.reg.A - self.reg.C;
            self.state = 4;
            self.reg.FZ = (d1 - d2) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2);
            self.reg.FC = check_carry_sub(d1, d2);
        },
        SUBr_E: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.E;
            self.reg.A = self.reg.A - self.reg.E;
            self.state = 4;
            self.reg.FZ = (d1 - d2) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2);
            self.reg.FC = check_carry_sub(d1, d2);
        },
        SUBr_L: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.L;
            self.reg.A = self.reg.A - self.reg.L;
            self.state = 4;
            self.reg.FZ = (d1 - d2) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2);
            self.reg.FC = check_carry_sub(d1, d2);
        },
        SUBn: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.PC);
            self.reg.A = self.reg.A - memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
            self.reg.FZ = (d1 - d2) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2);
            self.reg.FC = check_carry_sub(d1, d2);
        },
        SUBHL: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.HL);
            self.reg.A = self.reg.A - memory_read_8bit(self.reg.HL);
            self.state = 8;
            self.reg.FZ = (d1 - d2) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2);
            self.reg.FC = check_carry_sub(d1, d2);
        },
        SBCr_A: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.A;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A - self.reg.A - self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 - d2 - d3) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2, d3);
            self.reg.FC = check_carry_sub(d1, d2, d3);
        },
        SBCr_B: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.B;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A - self.reg.B - self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 - d2 - d3) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2, d3);
            self.reg.FC = check_carry_sub(d1, d2, d3);
        },
        SBCr_D: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.D;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A - self.reg.D - self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 - d2 - d3) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2, d3);
            self.reg.FC = check_carry_sub(d1, d2, d3);
        },
        SBCr_H: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.H;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A - self.reg.H - self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 - d2 - d3) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2, d3);
            self.reg.FC = check_carry_sub(d1, d2, d3);
        },
        SBCr_C: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.C;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A - self.reg.C - self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 - d2 - d3) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2, d3);
            self.reg.FC = check_carry_sub(d1, d2, d3);
        },
        SBCr_E: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.E;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A - self.reg.E - self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 - d2 - d3) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2, d3);
            self.reg.FC = check_carry_sub(d1, d2, d3);
        },
        SBCr_L: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.L;
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A - self.reg.L - self.reg.FC;
            self.state = 4;
            self.reg.FZ = (d1 - d2 - d3) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2, d3);
            self.reg.FC = check_carry_sub(d1, d2, d3);
        },
        SBCn: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.PC);
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A - memory_read_8bit(self.reg.PC) - self.reg.FC;
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
            self.reg.FZ = (d1 - d2 - d3) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2, d3);
            self.reg.FC = check_carry_sub(d1, d2, d3);
        },
        SBCHL: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.HL);
            var d3 = self.reg.FC;
            self.reg.A = self.reg.A - memory_read_8bit(self.reg.HL) - self.reg.FC;
            self.state = 8;
            self.reg.FZ = (d1 - d2 - d3) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(d1, d2, d3);
            self.reg.FC = check_carry_sub(d1, d2, d3);
        },
        ANDr_A: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.A;
            self.reg.A = self.reg.A & self.reg.A;
            self.state = 4;
            self.reg.FZ = (d1 & d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.reg.FC = 0;
        },
        ANDr_B: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.B;
            self.reg.A = self.reg.A & self.reg.B;
            self.state = 4;
            self.reg.FZ = (d1 & d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.reg.FC = 0;
        },
        ANDr_D: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.D;
            self.reg.A = self.reg.A & self.reg.D;
            self.state = 4;
            self.reg.FZ = (d1 & d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.reg.FC = 0;
        },
        ANDr_H: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.H;
            self.reg.A = self.reg.A & self.reg.H;
            self.state = 4;
            self.reg.FZ = (d1 & d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.reg.FC = 0;
        },
        ANDr_C: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.C;
            self.reg.A = self.reg.A & self.reg.C;
            self.state = 4;
            self.reg.FZ = (d1 & d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.reg.FC = 0;
        },
        ANDr_E: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.E;
            self.reg.A = self.reg.A & self.reg.E;
            self.state = 4;
            self.reg.FZ = (d1 & d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.reg.FC = 0;
        },
        ANDr_L: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.L;
            self.reg.A = self.reg.A & self.reg.L;
            self.state = 4;
            self.reg.FZ = (d1 & d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.reg.FC = 0;
        },
        ANDrn: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.PC);
            self.reg.A = self.reg.A & memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
            self.reg.FZ = (d1 & d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.reg.FC = 0;
        },
        ANDrHL: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.HL);
            self.reg.A = self.reg.A & memory_read_8bit(self.reg.HL);
            self.state = 8;
            self.reg.FZ = (d1 & d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.reg.FC = 0;
        },
        ORr_A: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.A;
            self.reg.A = self.reg.A | self.reg.A;
            self.state = 4;
            self.reg.FZ = (d1 | d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        ORr_B: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.B;
            self.reg.A = self.reg.A | self.reg.B;
            self.state = 4;
            self.reg.FZ = (d1 | d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        ORr_D: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.D;
            self.reg.A = self.reg.A | self.reg.D;
            self.state = 4;
            self.reg.FZ = (d1 | d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        ORr_H: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.H;
            self.reg.A = self.reg.A | self.reg.H;
            self.state = 4;
            self.reg.FZ = (d1 | d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        ORr_C: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.C;
            self.reg.A = self.reg.A | self.reg.C;
            self.state = 4;
            self.reg.FZ = (d1 | d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        ORr_E: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.E;
            self.reg.A = self.reg.A | self.reg.E;
            self.state = 4;
            self.reg.FZ = (d1 | d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        ORr_L: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.L;
            self.reg.A = self.reg.A | self.reg.L;
            self.state = 4;
            self.reg.FZ = (d1 | d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        ORn: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.PC);
            self.reg.A = self.reg.A | memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
            self.reg.FZ = (d1 | d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        ORHL: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.HL);
            self.reg.A = self.reg.A | memory_read_8bit(self.reg.HL);
            self.state = 8;
            self.reg.FZ = (d1 | d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        XORr_A: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.A;
            self.reg.A = self.reg.A ^ self.reg.A;
            self.state = 4;
            self.reg.FZ = (d1 ^ d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        XORr_B: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.B;
            self.reg.A = self.reg.A ^ self.reg.B;
            self.state = 4;
            self.reg.FZ = (d1 ^ d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        XORr_D: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.D;
            self.reg.A = self.reg.A ^ self.reg.D;
            self.state = 4;
            self.reg.FZ = (d1 ^ d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        XORr_H: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.H;
            self.reg.A = self.reg.A ^ self.reg.H;
            self.state = 4;
            self.reg.FZ = (d1 ^ d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        XORr_C: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.C;
            self.reg.A = self.reg.A ^ self.reg.C;
            self.state = 4;
            self.reg.FZ = (d1 ^ d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        XORr_E: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.E;
            self.reg.A = self.reg.A ^ self.reg.E;
            self.state = 4;
            self.reg.FZ = (d1 ^ d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        XORr_L: function () {
            var d1 = self.reg.A;
            var d2 = self.reg.L;
            self.reg.A = self.reg.A ^ self.reg.L;
            self.state = 4;
            self.reg.FZ = (d1 ^ d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        XORn: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.PC);
            self.reg.A = self.reg.A ^ memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
            self.reg.FZ = (d1 ^ d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        XORHL: function () {
            var d1 = self.reg.A;
            var d2 = memory_read_8bit(self.reg.HL);
            self.reg.A = self.reg.A ^ memory_read_8bit(self.reg.HL);
            self.state = 8;
            self.reg.FZ = (d1 ^ d2) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        CPr_A: function () {
            var n = self.reg.A;
            self.state = 4;
            self.reg.FZ = (self.reg.A - n) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(self.reg.A, n);
            self.reg.FC = check_carry_sub(self.reg.A, n);
        },
        CPr_B: function () {
            var n = self.reg.B;
            self.state = 4;
            self.reg.FZ = (self.reg.A - n) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(self.reg.A, n);
            self.reg.FC = check_carry_sub(self.reg.A, n);
        },
        CPr_D: function () {
            var n = self.reg.D;
            self.state = 4;
            self.reg.FZ = (self.reg.A - n) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(self.reg.A, n);
            self.reg.FC = check_carry_sub(self.reg.A, n);
        },
        CPr_H: function () {
            var n = self.reg.H;
            self.state = 4;
            self.reg.FZ = (self.reg.A - n) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(self.reg.A, n);
            self.reg.FC = check_carry_sub(self.reg.A, n);
        },
        CPr_C: function () {
            var n = self.reg.C;
            self.state = 4;
            self.reg.FZ = (self.reg.A - n) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(self.reg.A, n);
            self.reg.FC = check_carry_sub(self.reg.A, n);
        },
        CPr_E: function () {
            var n = self.reg.E;
            self.state = 4;
            self.reg.FZ = (self.reg.A - n) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(self.reg.A, n);
            self.reg.FC = check_carry_sub(self.reg.A, n);
        },
        CPr_L: function () {
            var n = self.reg.L;
            self.state = 4;
            self.reg.FZ = (self.reg.A - n) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(self.reg.A, n);
            self.reg.FC = check_carry_sub(self.reg.A, n);
        },
        CPn: function () {
            var n = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            self.state = 8;
            self.reg.FZ = (self.reg.A - n) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(self.reg.A, n);
            self.reg.FC = check_carry_sub(self.reg.A, n);
        },
        CPHL: function () {
            var n = memory_read_8bit(self.reg.HL);
            self.state = 8;
            self.reg.FZ = (self.reg.A - n) == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = check_half_carry_sub(self.reg.A, n);
            self.reg.FC = check_carry_sub(self.reg.A, n);
        },
        INCr_A: function () {
            self.reg.A = self.reg.A + 1;
            self.state = 4;
            var n = self.reg.A;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = n >= 10 ? 1 : 0;
            self.reg.FC = 0;
        },
        INCr_B: function () {
            self.reg.B = self.reg.B + 1;
            self.state = 4;
            var n = self.reg.B;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = n >= 10 ? 1 : 0;
            self.reg.FC = 0;
        },
        INCr_D: function () {
            self.reg.D = self.reg.D + 1;
            self.state = 4;
            var n = self.reg.D;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = n >= 10 ? 1 : 0;
            self.reg.FC = 0;
        },
        INCr_H: function () {
            self.reg.H = self.reg.H + 1;
            self.state = 4;
            var n = self.reg.H;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = n >= 10 ? 1 : 0;
            self.reg.FC = 0;
        },
        INCr_C: function () {
            self.reg.C = self.reg.C + 1;
            self.state = 4;
            var n = self.reg.C;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = n >= 10 ? 1 : 0;
            self.reg.FC = 0;
        },
        INCr_E: function () {
            self.reg.E = self.reg.E + 1;
            self.state = 4;
            var n = self.reg.E;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = n >= 10 ? 1 : 0;
            self.reg.FC = 0;
        },
        INCr_L: function () {
            self.reg.L = self.reg.L + 1;
            self.state = 4;
            var n = self.reg.L;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = n >= 10 ? 1 : 0;
            self.reg.FC = 0;
        },
        INCHL: function () {
            memory_write_8bit(self.reg.HL, memory_read_8bit(self.reg.HL) + 1);
            self.state = 12;
            var n = memory_read_8bit(self.reg.HL);
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = n >= 10 ? 1 : 0;
            self.reg.FC = 0;
        },
        DECr_A: function () {
            self.reg.A = self.reg.A - 1;
            self.state = 4;
            var n = self.reg.A;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = (n & 0x0F == 0x0F) ? 1 : 0;
            self.reg.FC = 0;
        },
        DECr_B: function () {
            self.reg.B = self.reg.B - 1;
            self.state = 4;
            var n = self.reg.B;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = (n & 0x0F == 0x0F) ? 1 : 0;
            self.reg.FC = 0;
        },
        DECr_D: function () {
            self.reg.D = self.reg.D - 1;
            self.state = 4;
            var n = self.reg.D;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = (n & 0x0F == 0x0F) ? 1 : 0;
            self.reg.FC = 0;
        },
        DECr_H: function () {
            self.reg.H = self.reg.H - 1;
            self.state = 4;
            var n = self.reg.H;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = (n & 0x0F == 0x0F) ? 1 : 0;
            self.reg.FC = 0;
        },
        DECr_C: function () {
            self.reg.C = self.reg.C - 1;
            self.state = 4;
            var n = self.reg.C;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = (n & 0x0F == 0x0F) ? 1 : 0;
            self.reg.FC = 0;
        },
        DECr_E: function () {
            self.reg.E = self.reg.E - 1;
            self.state = 4;
            var n = self.reg.E;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = (n & 0x0F == 0x0F) ? 1 : 0;
            self.reg.FC = 0;
        },
        DECr_L: function () {
            self.reg.L = self.reg.L - 1;
            self.state = 4;
            var n = self.reg.L;
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = (n & 0x0F == 0x0F) ? 1 : 0;
            self.reg.FC = 0;
        },
        DECHL: function () {
            memory_write_8bit(self.reg.HL, memory_read_8bit(self.reg.HL) - 1);
            self.state = 12;
            var n = memory_read_8bit(self.reg.HL);
            self.reg.FZ = n == 0 ? 1 : 0;
            self.reg.FN = 1;
            self.reg.FH = (n & 0x0F == 0x0F) ? 1 : 0;
            self.reg.FC = 0;
        },
        // 16bit ALUs
        ADDHL_BC: function () {
            var d1 = self.reg.HL;
            var d2 = self.reg.BC;
            self.reg.HL = self.reg.HL + self.reg.BC;
            self.state = 8;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry_16bit(d1, d2);
            self.reg.FC = check_carry_16bit(d1, d2);
        },
        ADDHL_DE: function () {
            var d1 = self.reg.HL;
            var d2 = self.reg.DE;
            self.reg.HL = self.reg.HL + self.reg.DE;
            self.state = 8;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry_16bit(d1, d2);
            self.reg.FC = check_carry_16bit(d1, d2);
        },
        ADDHL_HL: function () {
            var d1 = self.reg.HL;
            var d2 = self.reg.HL;
            self.reg.HL = self.reg.HL + self.reg.HL;
            self.state = 8;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry_16bit(d1, d2);
            self.reg.FC = check_carry_16bit(d1, d2);
        },
        ADDHL_SP: function () {
            var d1 = self.reg.HL;
            var d2 = self.reg.SP;
            self.reg.HL = self.reg.HL + self.reg.SP;
            self.state = 8;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry_16bit(d1, d2);
            self.reg.FC = check_carry_16bit(d1, d2);
        },
        ADDSPe: function () {
            var d1 = self.reg.SP;
            var e = memory_read_8bit(self.reg.PC);
            e = to_sign_8bit(e);
            self.reg.PC = self.reg.PC + 1;
            self.reg.SP = self.reg.SP + e;
            self.state = 16;
            self.reg.FZ = 0;
            self.reg.FN = 0;
            self.reg.FH = check_half_carry_16bit(d1, e);
            self.reg.FC = check_carry_16bit(d1, e);
        },
        INC_BC: function () {
            self.reg.BC = self.reg.BC + 1;
            self.state = 8;
        },
        INC_DE: function () {
            self.reg.DE = self.reg.DE + 1;
            self.state = 8;
        },
        INC_HL: function () {
            self.reg.HL = self.reg.HL + 1;
            self.state = 8;
        },
        INC_SP: function () {
            self.reg.SP = self.reg.SP + 1;
            self.state = 8;
        },
        DEC_BC: function () {
            self.reg.BC = self.reg.BC - 1;
            self.state = 8;
        },
        DEC_DE: function () {
            self.reg.DE = self.reg.DE - 1;
            self.state = 8;
        },
        DEC_HL: function () {
            self.reg.HL = self.reg.HL - 1;
            self.state = 8;
        },
        DEC_SP: function () {
            self.reg.SP = self.reg.SP - 1;
            self.state = 8;
        },
        // Miscellaneous
        SWAPr_A: function () {
            self.reg.A = ((self.reg.A & 0xF0) >> 4) + ((self.reg.A & 0x0F) << 4);
            self.state = 8;
            self.reg.FZ = self.reg.A == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        SWAPr_B: function () {
            self.reg.B = ((self.reg.B & 0xF0) >> 4) + ((self.reg.B & 0x0F) << 4);
            self.state = 8;
            self.reg.FZ = self.reg.B == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        SWAPr_D: function () {
            self.reg.D = ((self.reg.D & 0xF0) >> 4) + ((self.reg.D & 0x0F) << 4);
            self.state = 8;
            self.reg.FZ = self.reg.D == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        SWAPr_H: function () {
            self.reg.H = ((self.reg.H & 0xF0) >> 4) + ((self.reg.H & 0x0F) << 4);
            self.state = 8;
            self.reg.FZ = self.reg.H == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        SWAPr_C: function () {
            self.reg.C = ((self.reg.C & 0xF0) >> 4) + ((self.reg.C & 0x0F) << 4);
            self.state = 8;
            self.reg.FZ = self.reg.C == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        SWAPr_E: function () {
            self.reg.E = ((self.reg.E & 0xF0) >> 4) + ((self.reg.E & 0x0F) << 4);
            self.state = 8;
            self.reg.FZ = self.reg.E == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        SWAPr_L: function () {
            self.reg.L = ((self.reg.L & 0xF0) >> 4) + ((self.reg.L & 0x0F) << 4);
            self.state = 8;
            self.reg.FZ = self.reg.L == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        SWAPHL: function () {
            var r = memory_read_8bit(self.reg.HL);
            memory_write_8bit(self.reg.HL, ((r & 0xF0) >> 4) + ((r & 0x0F) << 4));
            self.state = 16;
            self.reg.FZ = memory_read_8bit(self.reg.HL) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
            self.reg.FC = 0;
        },
        DAA: function () {
            self.reg.A = parseInt(to_hex(self.reg.A), 10);
            self.state = 4;
            self.reg.FZ = self.reg.A == 0 ? 1 : 0;
            self.reg.FH = 0;
            self.reg.FC = self.reg.A > 0xFF;
        },
        CPL: function () {
            self.reg.A = ~self.reg.A;
            self.state = 4;
            self.reg.FN = 1;
            self.reg.FH = 1;
        },
        CCF: function () {
            self.reg.FC = ~self.reg.FC;
            self.state = 4;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SCF: function () {
            self.reg.FC = 1;
            self.state = 4;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        NOP: function () {
            self.state = 4;
        },
        HALT: function () {
            // TODO: implement halt self...
            self.state = 4;
        },
        STOP: function () {
            // TODO: implement halt cpu
            self.state = 4;
        },
        DI: function () {
            system.IME = 0;
            self.state = 4;
        },
        EI: function () {
            // TODO: implement enable interrupts
            system.IME = 1;
            self.state = 4;
        },
        // Rotates and Shifts
        RLCA: function () {
            self.reg.FC = ((self.reg.A & 0x80) == 0x80 ? 1 : 0);
            self.reg.A = ((self.reg.A << 1) & 0xFF) + ((self.reg.A & 0x80) >> 7);
            self.state = 4;
            self.reg.FZ = 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLA: function () {
            var old = self.reg.FC;
            self.reg.FC = ((self.reg.A & 0x80) == 0x80 ? 1 : 0);
            self.reg.A = ((self.reg.A << 1) & 0xFF) + old;
            self.state = 4;
            self.reg.FZ = 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRCA: function () {
            self.reg.FC = self.reg.A & 0x01;
            self.reg.A = ((self.reg.A >> 1) & 0x7F) + ((self.reg.A & 0x01) << 7);
            self.state = 4;
            self.reg.FZ = 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRA: function () {
            var old = self.reg.FC;
            self.reg.FC = self.reg.A & 0x01;
            self.reg.A = ((self.reg.A >> 1) & 0x7F) + (old << 7);
            self.state = 4;
            self.reg.FZ = 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLCr_A: function () {
            self.reg.FC = ((self.reg.A & 0x80) == 0x80 ? 1 : 0);
            self.reg.A = ((self.reg.A << 1) & 0xFF) + ((self.reg.A & 0x80) >> 7);
            self.state = 8;
            self.reg.FZ = self.reg.A == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLCr_B: function () {
            self.reg.FC = ((self.reg.B & 0x80) == 0x80 ? 1 : 0);
            self.reg.B = ((self.reg.B << 1) & 0xFF) + ((self.reg.B & 0x80) >> 7);
            self.state = 8;
            self.reg.FZ = self.reg.B == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLCr_D: function () {
            self.reg.FC = ((self.reg.D & 0x80) == 0x80 ? 1 : 0);
            self.reg.D = ((self.reg.D << 1) & 0xFF) + ((self.reg.D & 0x80) >> 7);
            self.state = 8;
            self.reg.FZ = self.reg.D == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLCr_H: function () {
            self.reg.FC = ((self.reg.H & 0x80) == 0x80 ? 1 : 0);
            self.reg.H = ((self.reg.H << 1) & 0xFF) + ((self.reg.H & 0x80) >> 7);
            self.state = 8;
            self.reg.FZ = self.reg.H == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLCr_C: function () {
            self.reg.FC = ((self.reg.C & 0x80) == 0x80 ? 1 : 0);
            self.reg.C = ((self.reg.C << 1) & 0xFF) + ((self.reg.C & 0x80) >> 7);
            self.state = 8;
            self.reg.FZ = self.reg.C == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLCr_E: function () {
            self.reg.FC = ((self.reg.E & 0x80) == 0x80 ? 1 : 0);
            self.reg.E = ((self.reg.E << 1) & 0xFF) + ((self.reg.E & 0x80) >> 7);
            self.state = 8;
            self.reg.FZ = self.reg.E == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLCr_L: function () {
            self.reg.FC = ((self.reg.L & 0x80) == 0x80 ? 1 : 0);
            self.reg.L = ((self.reg.L << 1) & 0xFF) + ((self.reg.L & 0x80) >> 7);
            self.state = 8;
            self.reg.FZ = self.reg.L == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLCHL: function () {
            var d = memory_read_8bit(self.reg.HL);
            self.reg.FC = (d & 0x80) >> 7;
            memory_write_8bit(self.reg.HL, ((d << 1) & 0xFF) + ((d & 0x80) >> 7));
            self.state = 16;
            self.reg.FZ = memory_read_8bit(self.reg.HL) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLr_A: function () {
            var old = self.reg.FC;
            self.reg.FC = (self.reg.A & 0x80) >> 7;
            self.reg.A = ((self.reg.A << 1) & 0xFF) + old;
            self.state = 8;
            self.reg.FZ = self.reg.A == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLr_B: function () {
            var old = self.reg.FC;
            self.reg.FC = (self.reg.B & 0x80) >> 7;
            self.reg.B = ((self.reg.B << 1) & 0xFF) + old;
            self.state = 8;
            self.reg.FZ = self.reg.B == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLr_D: function () {
            var old = self.reg.FC;
            self.reg.FC = (self.reg.D & 0x80) >> 7;
            self.reg.D = ((self.reg.D << 1) & 0xFF) + old;
            self.state = 8;
            self.reg.FZ = self.reg.D == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLr_H: function () {
            var old = self.reg.FC;
            self.reg.FC = (self.reg.H & 0x80) >> 7;
            self.reg.H = ((self.reg.H << 1) & 0xFF) + old;
            self.state = 8;
            self.reg.FZ = self.reg.H == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLr_C: function () {
            var old = self.reg.FC;
            self.reg.FC = (self.reg.C & 0x80) >> 7;
            self.reg.C = ((self.reg.C << 1) & 0xFF) + old;
            self.state = 8;
            self.reg.FZ = self.reg.C == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLr_E: function () {
            var old = self.reg.FC;
            self.reg.FC = (self.reg.E & 0x80) >> 7;
            self.reg.E = ((self.reg.E << 1) & 0xFF) + old;
            self.state = 8;
            self.reg.FZ = self.reg.E == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLr_L: function () {
            var old = self.reg.FC;
            self.reg.FC = (self.reg.L & 0x80) >> 7;
            self.reg.L = ((self.reg.L << 1) & 0xFF) + old;
            self.state = 8;
            self.reg.FZ = self.reg.L == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RLHL: function () {
            var old = self.reg.FC;
            var d = memory_read_8bit(self.reg.HL);
            self.reg.FC = (d & 0x80) >> 7;
            memory_write_8bit(self.reg.HL, ((d << 1) & 0xFF) + old);
            self.state = 16;
            self.reg.FZ = memory_read_8bit(self.reg.HL) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRCr_A: function () {
            self.reg.FC = self.reg.A & 0x01;
            self.reg.A = ((self.reg.A >> 1) & 0xFF) + ((self.reg.A & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.A == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRCr_B: function () {
            self.reg.FC = self.reg.B & 0x01;
            self.reg.B = ((self.reg.B >> 1) & 0xFF) + ((self.reg.B & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.B == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRCr_D: function () {
            self.reg.FC = self.reg.D & 0x01;
            self.reg.D = ((self.reg.D >> 1) & 0xFF) + ((self.reg.D & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.D == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRCr_H: function () {
            self.reg.FC = self.reg.H & 0x01;
            self.reg.H = ((self.reg.H >> 1) & 0xFF) + ((self.reg.H & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.H == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRCr_C: function () {
            self.reg.FC = self.reg.C & 0x01;
            self.reg.C = ((self.reg.C >> 1) & 0xFF) + ((self.reg.C & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.C == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRCr_E: function () {
            self.reg.FC = self.reg.E & 0x01;
            self.reg.E = ((self.reg.E >> 1) & 0xFF) + ((self.reg.E & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.E == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRCr_L: function () {
            self.reg.L = self.reg.L & 0x01;
            self.reg.L = ((self.reg.L >> 1) & 0xFF) + ((self.reg.L & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.L == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRCHL: function () {
            var d = memory_read_8bit(self.reg.HL);
            self.reg.FC = d & 0x01;
            memory_write_8bit(self.reg.HL, ((d >> 1) & 0xFF) + ((d & 0x01) << 7));
            self.state = 16;
            self.reg.FZ = memory_read_8bit(self.reg.HL) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRr_A: function () {
            self.reg.FC = self.reg.A & 0x01;
            self.reg.A = ((self.reg.A >> 1) & 0xFF) + ((self.reg.A & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.A == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRr_B: function () {
            self.reg.FC = self.reg.B & 0x01;
            self.reg.B = ((self.reg.B >> 1) & 0xFF) + ((self.reg.B & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.B == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRr_D: function () {
            self.reg.FC = self.reg.D & 0x01;
            self.reg.D = ((self.reg.D >> 1) & 0xFF) + ((self.reg.D & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.D == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRr_H: function () {
            self.reg.FC = self.reg.H & 0x01;
            self.reg.H = ((self.reg.H >> 1) & 0xFF) + ((self.reg.H & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.H == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRr_C: function () {
            self.reg.FC = self.reg.C & 0x01;
            self.reg.C = ((self.reg.C >> 1) & 0xFF) + ((self.reg.C & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.C == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRr_E: function () {
            self.reg.FC = self.reg.E & 0x01;
            self.reg.E = ((self.reg.E >> 1) & 0xFF) + ((self.reg.E & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.E == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRr_L: function () {
            self.reg.FC = self.reg.L & 0x01;
            self.reg.L = ((self.reg.L >> 1) & 0xFF) + ((self.reg.L & 0x01) << 7);
            self.state = 8;
            self.reg.FZ = self.reg.L == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        RRHL: function () {
            var d = memory_read_8bit(self.reg.HL);
            self.reg.FC = d & 0x01;
            memory_write_8bit(self.reg.HL, ((d >> 1) & 0xFF) + ((d & 0x01) << 7));
            self.state = 16;
            self.reg.FZ = memory_read_8bit(self.reg.HL) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SLAr_A: function () {
            self.reg.FC = (self.reg.A & 0x80) >> 7;
            self.reg.A = (self.reg.A << 1) & 0xFE;
            self.state = 8;
            self.reg.FZ = self.reg.A == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SLAr_B: function () {
            self.reg.FC = (self.reg.B & 0x80) >> 7;
            self.reg.B = (self.reg.B << 1) & 0xFE;
            self.state = 8;
            self.reg.FZ = self.reg.B == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SLAr_D: function () {
            self.reg.FC = (self.reg.D & 0x80) >> 7;
            self.reg.D = (self.reg.D << 1) & 0xFE;
            self.state = 8;
            self.reg.FZ = self.reg.D == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SLAr_H: function () {
            self.reg.FC = (self.reg.H & 0x80) >> 7;
            self.reg.H = (self.reg.H << 1) & 0xFE;
            self.state = 8;
            self.reg.FZ = self.reg.H == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SLAr_C: function () {
            self.reg.FC = (self.reg.C & 0x80) >> 7;
            self.reg.C = (self.reg.C << 1) & 0xFE;
            self.state = 8;
            self.reg.FZ = self.reg.C == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SLAr_E: function () {
            self.reg.FC = (self.reg.E & 0x80) >> 7;
            self.reg.E = (self.reg.E << 1) & 0xFE;
            self.state = 8;
            self.reg.FZ = self.reg.E == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SLAr_L: function () {
            self.reg.FC = (self.reg.L & 0x80) >> 7;
            self.reg.L = (self.reg.L << 1) & 0xFE;
            self.state = 8;
            self.reg.FZ = self.reg.L == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SLAHL: function () {
            var d = memory_read_8bit(self.reg.HL);
            self.reg.FC = (d & 0x80) >> 7;
            memory_write_8bit(self.reg.HL, (d << 1) & 0xFE);
            self.state = 16;
            self.reg.FZ = memory_read_8bit(self.reg.HL) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRAr_A: function () {
            self.reg.FC = self.reg.A & 0x01;
            self.reg.A = (self.reg.A & 0x80) + (self.reg.A >> 1);
            self.state = 8;
            self.reg.FZ = self.reg.A == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRAr_B: function () {
            self.reg.FC = self.reg.B & 0x01;
            self.reg.B = (self.reg.B & 0x80) + (self.reg.B >> 1);
            self.state = 8;
            self.reg.FZ = self.reg.B == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRAr_D: function () {
            self.reg.FC = self.reg.D & 0x01;
            self.reg.D = (self.reg.D & 0x80) + (self.reg.D >> 1);
            self.state = 8;
            self.reg.FZ = self.reg.D == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRAr_H: function () {
            self.reg.FC = self.reg.H & 0x01;
            self.reg.H = (self.reg.H & 0x80) + (self.reg.H >> 1);
            self.state = 8;
            self.reg.FZ = self.reg.H == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRAr_C: function () {
            self.reg.FC = self.reg.C & 0x01;
            self.reg.C = (self.reg.C & 0x80) + (self.reg.C >> 1);
            self.state = 8;
            self.reg.FZ = self.reg.C == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRAr_E: function () {
            self.reg.FC = self.reg.E & 0x01;
            self.reg.E = (self.reg.E & 0x80) + (self.reg.E >> 1);
            self.state = 8;
            self.reg.FZ = self.reg.E == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRAr_L: function () {
            self.reg.FC = self.reg.L & 0x01;
            self.reg.L = (self.reg.L & 0x80) + (self.reg.L >> 1);
            self.state = 8;
            self.reg.FZ = self.reg.L == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRAHL: function () {
            var d = memory_read_8bit(self.reg.HL);
            self.reg.FC = d & 0x01;
            memory_write_8bit(self.reg.HL, (d & 0x80) + (d >> 1));
            self.state = 16;
            self.reg.FZ = memory_read_8bit(self.reg.HL) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRLr_A: function () {
            self.reg.FC = self.reg.A & 0x01;
            self.reg.A = (self.reg.A >> 1) & 0x7F;
            self.state = 8;
            self.reg.FZ = self.reg.A == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRLr_B: function () {
            self.reg.FC = self.reg.B & 0x01;
            self.reg.B = (self.reg.B >> 1) & 0x7F;
            self.state = 8;
            self.reg.FZ = self.reg.B == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRLr_D: function () {
            self.reg.FC = self.reg.D & 0x01;
            self.reg.D = (self.reg.D >> 1) & 0x7F;
            self.state = 8;
            self.reg.FZ = self.reg.D == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRLr_H: function () {
            self.reg.FC = self.reg.H & 0x01;
            self.reg.H = (self.reg.H >> 1) & 0x7F;
            self.state = 8;
            self.reg.FZ = self.reg.H == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRLr_C: function () {
            self.reg.FC = self.reg.C & 0x01;
            self.reg.C = (self.reg.C >> 1) & 0x7F;
            self.state = 8;
            self.reg.FZ = self.reg.C == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRLr_E: function () {
            self.reg.FC = self.reg.E & 0x01;
            self.reg.E = (self.reg.E >> 1) & 0x7F;
            self.state = 8;
            self.reg.FZ = self.reg.E == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRLr_L: function () {
            self.reg.FC = self.reg.L & 0x01;
            self.reg.L = (self.reg.L >> 1) & 0x7F;
            self.state = 8;
            self.reg.FZ = self.reg.L == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        SRLHL: function () {
            var d = memory_read_8bit(self.reg.HL);
            self.reg.FC = d & 0x01;
            memory_write_8bit(self.reg.HL, (d >> 1) & 0x7F);
            self.state = 16;
            self.reg.FZ = memory_read_8bit(self.reg.HL) == 0 ? 1 : 0;
            self.reg.FN = 0;
            self.reg.FH = 0;
        },
        // Bit Operations
        BITr_A: function (b) {
            self.reg.FZ = ((self.reg.A & (1 << b)) == (1 << b)) ? 0 : 1;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.state = 8;
        },
        BITr_B: function (b) {
            self.reg.FZ = ((self.reg.B & (1 << b)) == (1 << b)) ? 0 : 1;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.state = 8;
        },
        BITr_D: function (b) {
            self.reg.FZ = ((self.reg.D & (1 << b)) == (1 << b)) ? 0 : 1;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.state = 8;
        },
        BITr_H: function (b) {
            self.reg.FZ = ((self.reg.H & (1 << b)) == (1 << b)) ? 0 : 1;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.state = 8;
        },
        BITr_C: function (b) {
            self.reg.FZ = ((self.reg.C & (1 << b)) == (1 << b)) ? 0 : 1;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.state = 8;
        },
        BITr_E: function (b) {
            self.reg.FZ = ((self.reg.C & (1 << b)) == (1 << b)) ? 0 : 1;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.state = 8;
        },
        BITr_L: function (b) {
            self.reg.FZ = ((self.reg.L & (1 << b)) == (1 << b)) ? 0 : 1;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.state = 8;
        },
        BITHL: function (b) {
            self.reg.FZ = ((memory_read_8bit(self.reg.HL) & (1 << b)) == (1 << b)) ? 0 : 1;
            self.reg.FN = 0;
            self.reg.FH = 1;
            self.state = 12;
        },
        SETr_A: function (b) {
            self.reg.A = self.reg.A | (1 << b);
            self.state = 8;
        },
        SETr_B: function (b) {
            self.reg.B = self.reg.B | (1 << b);
            self.state = 8;
        },
        SETr_D: function (b) {
            self.reg.D = self.reg.D | (1 << b);
            self.state = 8;
        },
        SETr_H: function (b) {
            self.reg.H = self.reg.H | (1 << b);
            self.state = 8;
        },
        SETr_C: function (b) {
            self.reg.C = self.reg.C | (1 << b);
            self.state = 8;
        },
        SETr_E: function (b) {
            self.reg.E = self.reg.E | (1 << b);
            self.state = 8;
        },
        SETr_L: function (b) {
            self.reg.L = self.reg.L | (1 << b);
            self.state = 8;
        },
        SETHL: function (b) {
            memory_write_8bit(self.reg.HL, memory_read_8bit(self.reg.HL) | (1 << b));
            self.state = 16;
        },
        RESr_A: function (b) {
            self.reg.A = ~(((~self.reg.A) & 0xFF) | (1 << b));
            self.state = 8;
        },
        RESr_B: function (b) {
            self.reg.B = ~(((~self.reg.B) & 0xFF) | (1 << b));
            self.state = 8;
        },
        RESr_D: function (b) {
            self.reg.D = ~(((~self.reg.D) & 0xFF) | (1 << b));
            self.state = 8;
        },
        RESr_H: function (b) {
            self.reg.H = ~(((~self.reg.H) & 0xFF) | (1 << b));
            self.state = 8;
        },
        RESr_C: function (b) {
            self.reg.C = ~(((~self.reg.C) & 0xFF) | (1 << b));
            self.state = 8;
        },
        RESr_E: function (b) {
            self.reg.E = ~(((~self.reg.E) & 0xFF) | (1 << b));
            self.state = 8;
        },
        RESr_L: function (b) {
            self.reg.L = ~(((~self.reg.L) & 0xFF) | (1 << b));
            self.state = 8;
        },
        RESHL: function (b) {
            memory_write_8bit(self.reg.HL, ~(((~memory_read_8bit(self.reg.HL)) & 0xFF) | (1 << b)));
            self.state = 16;
        },
        // A, B, D, H, C, E, L
        // Jumps
        JPnn: function () {
            var addr = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2; // makeshift
            self.reg.PC = addr;
            self.state = 16;
        },
        JPccnn_C: function () {
            var addr = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2;
            if (self.reg.FC == 1) {
                self.reg.PC = addr;
                self.state = 16;
            } else {
                self.state = 12;
            }
        },
        JPccnn_NC: function () {
            var addr = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2;
            if (self.reg.FC == 0) {
                self.reg.PC = addr;
                self.state = 16;
            } else {
                self.state = 12;
            }
        },
        JPccnn_Z: function () {
            var addr = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2;
            if (self.reg.FZ == 1) {
                self.reg.PC = addr;
                self.state = 16;
            } else {
                self.state = 12;
            }
        },
        JPccnn_NZ: function () {
            var addr = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2;
            if (self.reg.FZ == 0) {
                self.reg.PC = addr;
                self.state = 16;
            } else {
                self.state = 12;
            }
        },
        JPHL: function () {
            self.reg.PC = self.reg.HL;
            self.state = 4;
        },
        // C, NC, NZ, Z
        JRe: function () {
            var e = memory_read_8bit(self.reg.PC);
            e = to_sign_8bit(e);
            self.reg.PC = self.reg.PC + 1;
            self.reg.PC = self.reg.PC + e;
            self.state = 12;
        },
        JRcce_C: function () {
            var e = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            e = to_sign_8bit(e);
            if (self.reg.FC == 1) {
                self.reg.PC = self.reg.PC + e;
                self.state = 12;
            } else {
                self.state = 8;
            }
        },
        JRcce_NC: function () {
            var e = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            e = to_sign_8bit(e);
            if (self.reg.FC == 0) {
                self.reg.PC = self.reg.PC + e;
                self.state = 12;
            } else {
                self.state = 8;
            }
        },
        JRcce_Z: function () {
            var e = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            e = to_sign_8bit(e);
            if (self.reg.FZ == 1) {
                self.reg.PC = self.reg.PC + e;
                self.state = 12;
            } else {
                self.state = 8;
            }
        },
        JRcce_NZ: function () {
            var e = memory_read_8bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 1;
            e = to_sign_8bit(e);
            if (self.reg.FZ == 0) {
                self.reg.PC = self.reg.PC + e;
                self.state = 12;
            } else {
                self.state = 8;
            }
        },
        // Calls
        CALLnn_interrupt: function (n) {
            memory_write_8bit(self.reg.SP - 1, (self.reg.PC & 0xFF00) >> 8);
            memory_write_8bit(self.reg.SP - 2, self.reg.PC & 0x00FF);
            self.reg.PC = n;
            self.reg.SP = self.reg.SP - 2;
            self.state = 24;
        },
        CALLnn: function () {
            var n = memory_read_16bit(self.reg.PC);
            self.reg.PC = self.reg.PC + 2;
            memory_write_8bit(self.reg.SP - 1, (self.reg.PC & 0xFF00) >> 8);
            memory_write_8bit(self.reg.SP - 2, self.reg.PC & 0x00FF);
            self.reg.PC = n;
            self.reg.SP = self.reg.SP - 2;
            self.state = 24;
        },
        CALLccnn_C: function () {
            if (self.reg.FC == 1) {
                this.CALLnn();
            } else {
                self.reg.PC = self.reg.PC + 2;
                self.state = 12;
            }
        },
        CALLccnn_NC: function () {
            if (self.reg.FC == 0) {
                this.CALLnn();
            } else {
                self.reg.PC = self.reg.PC + 2;
                self.state = 12;
            }
        },
        CALLccnn_Z: function () {
            if (self.reg.FZ == 1) {
                this.CALLnn();
            } else {
                self.reg.PC = self.reg.PC + 2;
                self.state = 12;
            }
        },
        CALLccnn_NZ: function () {
            if (self.reg.FZ == 0) {
                this.CALLnn();
            } else {
                self.reg.PC = self.reg.PC + 2;
                self.state = 12;
            }
        },
        // Restarts
        RST_f: function (f) {
            memory_write_8bit(self.reg.SP - 1, (self.reg.PC & 0xFF00) >> 8);
            memory_write_8bit(self.reg.SP - 2, (self.reg.PC & 0x00FF));
            self.reg.PC = f & 0x00FF;
            self.reg.SP = self.reg.SP - 2;
            self.state = 16;
        },
        // Returns
        RET: function () {
            self.reg.PC = memory_read_8bit(self.reg.SP) + (memory_read_8bit(self.reg.SP + 1) << 8);
            self.reg.SP = self.reg.SP + 2;
            self.state = 16;
        },
        // C, NC, NZ, Z
        RETcc_C: function () {
            if (self.reg.FC == 1) {
                this.RET();
                self.state = 20;
            } else {
                self.state = 8;
            }
        },
        RETcc_NC: function () {
            if (self.reg.FC == 0) {
                this.RET();
                self.state = 20;
            } else {
                self.state = 8;
            }
        },
        RETcc_Z: function () {
            if (self.reg.FZ == 1) {
                this.RET();
                self.state = 20;
            } else {
                self.state = 8;
            }
        },
        RETcc_NZ: function () {
            if (self.reg.FZ == 0) {
                this.RET();
                self.state = 20;
            } else {
                self.state = 8;
            }
        },
        RETI: function () {
            this.RET();
            self.state = 16;
        }
    };
    this.reg = {
        A_: 0,
        B_: 0,
        D_: 0,
        H_: 0,
        FZ_: 0,
        FN_: 0,
        FH_: 0,
        FC_: 0,
        C_: 0,
        E_: 0,
        L_: 0,
        SP_: 0,
        PC_: 0,
        I_: 0,
        R_: 0
    };
    (function init_reg_getter_setter() {
        // getter
        self.reg.__defineGetter__('A', function () { return this.A_ & 0xFF; });
        self.reg.__defineGetter__('B', function () { return this.B_ & 0xFF; });
        self.reg.__defineGetter__('D', function () { return this.D_ & 0xFF; });
        self.reg.__defineGetter__('H', function () { return this.H_ & 0xFF; });
        self.reg.__defineGetter__('F', function () {
            return ((this.FZ_ << 7) + (this.FN_ << 6) + (this.FH_ << 5) + (this.FC_ << 4)) & 0xFF;
        });
        self.reg.__defineGetter__('FZ', function () { return this.FZ_ & 0x01; });
        self.reg.__defineGetter__('FN', function () { return this.FN_ & 0x01; });
        self.reg.__defineGetter__('FH', function () { return this.FH_ & 0x01; });
        self.reg.__defineGetter__('FC', function () { return this.FC_ & 0x01; });
        self.reg.__defineGetter__('C', function () { return this.C_ & 0xFF; });
        self.reg.__defineGetter__('E', function () { return this.E_ & 0xFF; });
        self.reg.__defineGetter__('L', function () { return this.L_ & 0xFF; });
        self.reg.__defineGetter__('SP', function () { return this.SP_ & 0xFFFF; });
        self.reg.__defineGetter__('PC', function () { return this.PC_ & 0xFFFF; });
        self.reg.__defineGetter__('I', function () { return this.I_ & 0xFF; });
        self.reg.__defineGetter__('R', function () { return this.R_ & 0xFF; });
        self.reg.__defineGetter__('BC', function () { return (((this.B & 0xFF) << 8) + this.C) & 0xFFFF; });
        self.reg.__defineGetter__('DE', function () { return (((this.D & 0xFF) << 8) + this.E) & 0xFFFF; });
        self.reg.__defineGetter__('HL', function () { return (((this.H & 0xFF) << 8) + this.L) & 0xFFFF; });
        // setter
        self.reg.__defineSetter__('A', function (x) { this.A_ = x & 0xFF; });
        self.reg.__defineSetter__('B', function (x) { this.B_ = x & 0xFF; });
        self.reg.__defineSetter__('D', function (x) { this.D_ = x & 0xFF; });
        self.reg.__defineSetter__('H', function (x) { this.H_ = x & 0xFF; });
        self.reg.__defineSetter__('F', function (x) {
            this.FZ_ = (x & 0x80) == 0x80 ? 1 : 0;
            this.FN_ = (x & 0x40) == 0x40 ? 1 : 0;
            this.FH_ = (x & 0x20) == 0x20 ? 1 : 0;
            this.FC_ = (x & 0x10) == 0x10 ? 1 : 0;
        });
        self.reg.__defineSetter__('FZ', function (x) { this.FZ_ = x & 0xFF; });
        self.reg.__defineSetter__('FN', function (x) { this.FN_ = x & 0xFF; });
        self.reg.__defineSetter__('FH', function (x) { this.FH_ = x & 0xFF; });
        self.reg.__defineSetter__('FC', function (x) { this.FC_ = x & 0xFF; });
        self.reg.__defineSetter__('C', function (x) { this.C_ = x & 0xFF; });
        self.reg.__defineSetter__('E', function (x) { this.E_ = x & 0xFF; });
        self.reg.__defineSetter__('L', function (x) { this.L_ = x & 0xFF; });
        self.reg.__defineSetter__('SP', function (x) { this.SP_ = x & 0xFFFF; });
        self.reg.__defineSetter__('PC', function (x) { this.PC_ = x & 0xFFFF; });
        self.reg.__defineSetter__('I', function (x) { this.I_ = x & 0xFF; });
        self.reg.__defineSetter__('R', function (x) { this.R_ = x & 0xFF; });
        self.reg.__defineSetter__('BC', function (x) { this.B = ((x & 0xFF00) >> 8) & 0xFF; this.C = (x & 0x00FF) & 0xFF; });
        self.reg.__defineSetter__('DE', function (x) { this.D = ((x & 0xFF00) >> 8) & 0xFF; this.E = (x & 0x00FF) & 0xFF; });
        self.reg.__defineSetter__('HL', function (x) { this.H = ((x & 0xFF00) >> 8) & 0xFF; this.L = (x & 0x00FF) & 0xFF; });
    })();
};

CPU.prototype = {
    code: function (opcode) {
        switch (opcode & 0xFF) {
            // 0x00                       
            case 0x00: debug_message_from_op('case 0x00'); this.op.NOP(); break;
            case 0x01: debug_message_from_op('case 0x01'); this.op.LDddnn_BC(); break;
            case 0x02: debug_message_from_op('case 0x02'); this.op.LDddA_BC(); break;
            case 0x03: debug_message_from_op('case 0x03'); this.op.INC_BC(); break;
            case 0x04: debug_message_from_op('case 0x04'); this.op.INCr_B(); break;
            case 0x05: debug_message_from_op('case 0x05'); this.op.DECr_B(); break;
            case 0x06: debug_message_from_op('case 0x06'); this.op.LDrn_b(); break;
            case 0x07: debug_message_from_op('case 0x07'); this.op.RLCr_A(); break;
            case 0x08: debug_message_from_op('case 0x08'); this.op.LDnnSP(); break;
            case 0x09: debug_message_from_op('case 0x09'); this.op.ADDHL_BC(); break;
            case 0x0A: debug_message_from_op('case 0x0A'); this.op.LDAss_BC(); break;
            case 0x0B: debug_message_from_op('case 0x0B'); this.op.DEC_BC(); break;
            case 0x0C: debug_message_from_op('case 0x0C'); this.op.INCr_C(); break;
            case 0x0D: debug_message_from_op('case 0x0D'); this.op.DECr_C(); break;
            case 0x0E: debug_message_from_op('case 0x0E'); this.op.LDrn_c(); break;
            case 0x0F: debug_message_from_op('case 0x0F'); this.op.RRCr_A(); break;
            // 0x10                       
            case 0x10: debug_message_from_op('case 0x10'); this.op.STOP(); break;
            case 0x11: debug_message_from_op('case 0x11'); this.op.LDddnn_DE(); break;
            case 0x12: debug_message_from_op('case 0x12'); this.op.LDddA_DE(); break;
            case 0x13: debug_message_from_op('case 0x13'); this.op.INC_DE(); break;
            case 0x14: debug_message_from_op('case 0x14'); this.op.INCr_D(); break;
            case 0x15: debug_message_from_op('case 0x15'); this.op.DECr_D(); break;
            case 0x16: debug_message_from_op('case 0x16'); this.op.LDrn_d(); break;
            case 0x17: debug_message_from_op('case 0x17'); this.op.RLr_A(); break;
            case 0x18: debug_message_from_op('case 0x18'); this.op.JRe(); break;
            case 0x19: debug_message_from_op('case 0x19'); this.op.ADDHL_DE(); break;
            case 0x1A: debug_message_from_op('case 0x1A'); this.op.LDAss_DE(); break;
            case 0x1B: debug_message_from_op('case 0x1B'); this.op.DEC_DE(); break;
            case 0x1C: debug_message_from_op('case 0x1C'); this.op.INCr_E(); break;
            case 0x1D: debug_message_from_op('case 0x1D'); this.op.DECr_E(); break;
            case 0x1E: debug_message_from_op('case 0x1E'); this.op.LDrn_e(); break;
            case 0x1F: debug_message_from_op('case 0x1F'); this.op.RRr_A(); break;
            // 0x20                       
            case 0x20: debug_message_from_op('case 0x20'); this.op.JRcce_NZ(); break;
            case 0x21: debug_message_from_op('case 0x21'); this.op.LDddnn_HL(); break;
            case 0x22: debug_message_from_op('case 0x22'); this.op.LDIHLA(); break;
            case 0x23: debug_message_from_op('case 0x23'); this.op.INC_HL(); break;
            case 0x24: debug_message_from_op('case 0x24'); this.op.INCr_H(); break;
            case 0x25: debug_message_from_op('case 0x25'); this.op.DECr_H(); break;
            case 0x26: debug_message_from_op('case 0x26'); this.op.LDrn_h(); break;
            case 0x27: debug_message_from_op('case 0x27'); this.op.DAA(); break;
            case 0x28: debug_message_from_op('case 0x28'); this.op.JRcce_Z(); break;
            case 0x29: debug_message_from_op('case 0x29'); this.op.ADDHL_HL(); break;
            case 0x2A: debug_message_from_op('case 0x2A'); this.op.LDIAHL(); break;
            case 0x2B: debug_message_from_op('case 0x2B'); this.op.DEC_HL(); break;
            case 0x2C: debug_message_from_op('case 0x2C'); this.op.INCr_L(); break;
            case 0x2D: debug_message_from_op('case 0x2D'); this.op.DECr_L(); break;
            case 0x2E: debug_message_from_op('case 0x2E'); this.op.LDrn_l(); break;
            case 0x2F: debug_message_from_op('case 0x2F'); this.op.CPL(); break;
            // 0x30                       
            case 0x30: debug_message_from_op('case 0x30'); this.op.JRcce_NC(); break;
            case 0x31: debug_message_from_op('case 0x31'); this.op.LDddnn_SP(); break;
            case 0x32: debug_message_from_op('case 0x32'); this.op.LDDHLA(); break;
            case 0x33: debug_message_from_op('case 0x33'); this.op.INC_SP(); break;
            case 0x34: debug_message_from_op('case 0x34'); this.op.INCHL(); break;
            case 0x35: debug_message_from_op('case 0x35'); this.op.DECHL(); break;
            case 0x36: debug_message_from_op('case 0x36'); this.op.LDHLn(); break;
            case 0x37: debug_message_from_op('case 0x37'); this.op.SCF(); break;
            case 0x38: debug_message_from_op('case 0x38'); this.op.JRcce_C(); break;
            case 0x39: debug_message_from_op('case 0x39'); this.op.ADDHL_SP(); break;
            case 0x3A: debug_message_from_op('case 0x3A'); this.op.LDDAHL(); break;
            case 0x3B: debug_message_from_op('case 0x3B'); this.op.DEC_SP(); break;
            case 0x3C: debug_message_from_op('case 0x3C'); this.op.INCr_A(); break;
            case 0x3D: debug_message_from_op('case 0x3D'); this.op.DECr_A(); break;
            case 0x3E: debug_message_from_op('case 0x3E'); this.op.LDrn_a(); break;
            case 0x3F: debug_message_from_op('case 0x3F'); this.op.CCF(); break;
            // 0x40                       
            case 0x40: debug_message_from_op('case 0x40'); this.op.LDrr_bb(); break;
            case 0x41: debug_message_from_op('case 0x41'); this.op.LDrr_bc(); break;
            case 0x42: debug_message_from_op('case 0x42'); this.op.LDrr_bd(); break;
            case 0x43: debug_message_from_op('case 0x43'); this.op.LDrr_be(); break;
            case 0x44: debug_message_from_op('case 0x44'); this.op.LDrr_bh(); break;
            case 0x45: debug_message_from_op('case 0x45'); this.op.LDrr_bl(); break;
            case 0x46: debug_message_from_op('case 0x46'); this.op.LDrHL_b(); break;
            case 0x47: debug_message_from_op('case 0x47'); this.op.LDrr_ba(); break;
            case 0x48: debug_message_from_op('case 0x48'); this.op.LDrr_cb(); break;
            case 0x49: debug_message_from_op('case 0x49'); this.op.LDrr_cc(); break;
            case 0x4A: debug_message_from_op('case 0x4A'); this.op.LDrr_cd(); break;
            case 0x4B: debug_message_from_op('case 0x4B'); this.op.LDrr_ce(); break;
            case 0x4C: debug_message_from_op('case 0x4C'); this.op.LDrr_ch(); break;
            case 0x4D: debug_message_from_op('case 0x4D'); this.op.LDrr_cl(); break;
            case 0x4E: debug_message_from_op('case 0x4E'); this.op.LDrHL_c(); break;
            case 0x4F: debug_message_from_op('case 0x4F'); this.op.LDrr_ca(); break;
            // 0x50                       
            case 0x50: debug_message_from_op('case 0x50'); this.op.LDrr_db(); break;
            case 0x51: debug_message_from_op('case 0x51'); this.op.LDrr_dc(); break;
            case 0x52: debug_message_from_op('case 0x52'); this.op.LDrr_dd(); break;
            case 0x53: debug_message_from_op('case 0x53'); this.op.LDrr_de(); break;
            case 0x54: debug_message_from_op('case 0x54'); this.op.LDrr_dh(); break;
            case 0x55: debug_message_from_op('case 0x55'); this.op.LDrr_dl(); break;
            case 0x56: debug_message_from_op('case 0x56'); this.op.LDrHL_d(); break;
            case 0x57: debug_message_from_op('case 0x57'); this.op.LDrr_da(); break;
            case 0x58: debug_message_from_op('case 0x58'); this.op.LDrr_eb(); break;
            case 0x59: debug_message_from_op('case 0x59'); this.op.LDrr_ec(); break;
            case 0x5A: debug_message_from_op('case 0x5A'); this.op.LDrr_ed(); break;
            case 0x5B: debug_message_from_op('case 0x5B'); this.op.LDrr_ee(); break;
            case 0x5C: debug_message_from_op('case 0x5C'); this.op.LDrr_eh(); break;
            case 0x5D: debug_message_from_op('case 0x5D'); this.op.LDrr_el(); break;
            case 0x5E: debug_message_from_op('case 0x5E'); this.op.LDrHL_e(); break;
            case 0x5F: debug_message_from_op('case 0x5F'); this.op.LDrr_ea(); break;
            // 0x60                       
            case 0x60: debug_message_from_op('case 0x60'); this.op.LDrr_hb(); break;
            case 0x61: debug_message_from_op('case 0x61'); this.op.LDrr_hc(); break;
            case 0x62: debug_message_from_op('case 0x62'); this.op.LDrr_hd(); break;
            case 0x63: debug_message_from_op('case 0x63'); this.op.LDrr_he(); break;
            case 0x64: debug_message_from_op('case 0x64'); this.op.LDrr_hh(); break;
            case 0x65: debug_message_from_op('case 0x65'); this.op.LDrr_hl(); break;
            case 0x66: debug_message_from_op('case 0x66'); this.op.LDrHL_h(); break;
            case 0x67: debug_message_from_op('case 0x67'); this.op.LDrr_ha(); break;
            case 0x68: debug_message_from_op('case 0x68'); this.op.LDrr_lb(); break;
            case 0x69: debug_message_from_op('case 0x69'); this.op.LDrr_lc(); break;
            case 0x6A: debug_message_from_op('case 0x6A'); this.op.LDrr_ld(); break;
            case 0x6B: debug_message_from_op('case 0x6B'); this.op.LDrr_le(); break;
            case 0x6C: debug_message_from_op('case 0x6C'); this.op.LDrr_lh(); break;
            case 0x6D: debug_message_from_op('case 0x6D'); this.op.LDrr_ll(); break;
            case 0x6E: debug_message_from_op('case 0x6E'); this.op.LDrHL_l(); break;
            case 0x6F: debug_message_from_op('case 0x6F'); this.op.LDrr_la(); break;
            // 0x70                       
            case 0x70: debug_message_from_op('case 0x70'); this.op.LDHLr_b(); break;
            case 0x71: debug_message_from_op('case 0x71'); this.op.LDHLr_c(); break;
            case 0x72: debug_message_from_op('case 0x72'); this.op.LDHLr_d(); break;
            case 0x73: debug_message_from_op('case 0x73'); this.op.LDHLr_e(); break;
            case 0x74: debug_message_from_op('case 0x74'); this.op.LDHLr_h(); break;
            case 0x75: debug_message_from_op('case 0x75'); this.op.LDHLr_l(); break;
            case 0x76: debug_message_from_op('case 0x76'); this.op.HALT(); break;
            case 0x77: debug_message_from_op('case 0x77'); this.op.LDHLr_a(); break;
            case 0x78: debug_message_from_op('case 0x78'); this.op.LDrr_ab(); break;
            case 0x79: debug_message_from_op('case 0x79'); this.op.LDrr_ac(); break;
            case 0x7A: debug_message_from_op('case 0x7A'); this.op.LDrr_ad(); break;
            case 0x7B: debug_message_from_op('case 0x7B'); this.op.LDrr_ae(); break;
            case 0x7C: debug_message_from_op('case 0x7C'); this.op.LDrr_ah(); break;
            case 0x7D: debug_message_from_op('case 0x7D'); this.op.LDrr_al(); break;
            case 0x7E: debug_message_from_op('case 0x7E'); this.op.LDrHL_a(); break;
            case 0x7F: debug_message_from_op('case 0x7F'); this.op.LDrr_aa(); break;
            // 0x80                       
            case 0x80: debug_message_from_op('case 0x80'); this.op.ADDAr_B(); break;
            case 0x81: debug_message_from_op('case 0x81'); this.op.ADDAr_C(); break;
            case 0x82: debug_message_from_op('case 0x82'); this.op.ADDAr_D(); break;
            case 0x83: debug_message_from_op('case 0x83'); this.op.ADDAr_E(); break;
            case 0x84: debug_message_from_op('case 0x84'); this.op.ADDAr_H(); break;
            case 0x85: debug_message_from_op('case 0x85'); this.op.ADDAr_L(); break;
            case 0x86: debug_message_from_op('case 0x86'); this.op.ADDAHL(); break;
            case 0x87: debug_message_from_op('case 0x87'); this.op.ADDAr_A(); break;
            case 0x88: debug_message_from_op('case 0x88'); this.op.ADCAr_B(); break;
            case 0x89: debug_message_from_op('case 0x89'); this.op.ADCAr_C(); break;
            case 0x8A: debug_message_from_op('case 0x8A'); this.op.ADCAr_D(); break;
            case 0x8B: debug_message_from_op('case 0x8B'); this.op.ADCAr_E(); break;
            case 0x8C: debug_message_from_op('case 0x8C'); this.op.ADCAr_H(); break;
            case 0x8D: debug_message_from_op('case 0x8D'); this.op.ADCAr_L(); break;
            case 0x8E: debug_message_from_op('case 0x8E'); this.op.ADCAHL(); break;
            case 0x8F: debug_message_from_op('case 0x8F'); this.op.ADCAr_A(); break;
            // 0x90                       
            case 0x90: debug_message_from_op('case 0x90'); this.op.SUBr_B(); break;
            case 0x91: debug_message_from_op('case 0x91'); this.op.SUBr_C(); break;
            case 0x92: debug_message_from_op('case 0x92'); this.op.SUBr_D(); break;
            case 0x93: debug_message_from_op('case 0x93'); this.op.SUBr_E(); break;
            case 0x94: debug_message_from_op('case 0x94'); this.op.SUBr_H(); break;
            case 0x95: debug_message_from_op('case 0x95'); this.op.SUBr_L(); break;
            case 0x96: debug_message_from_op('case 0x96'); this.op.SUBHL(); break;
            case 0x97: debug_message_from_op('case 0x97'); this.op.SUBr_A(); break;
            case 0x98: debug_message_from_op('case 0x98'); this.op.SBCr_B(); break;
            case 0x99: debug_message_from_op('case 0x99'); this.op.SBCr_C(); break;
            case 0x9A: debug_message_from_op('case 0x9A'); this.op.SBCr_D(); break;
            case 0x9B: debug_message_from_op('case 0x9B'); this.op.SBCr_E(); break;
            case 0x9C: debug_message_from_op('case 0x9C'); this.op.SBCr_H(); break;
            case 0x9D: debug_message_from_op('case 0x9D'); this.op.SBCr_L(); break;
            case 0x9E: debug_message_from_op('case 0x9E'); this.op.SBCHL(); break;
            case 0x9F: debug_message_from_op('case 0x9F'); this.op.SBCr_A(); break;
            // 0xA0                       
            case 0xA0: debug_message_from_op('case 0xA0'); this.op.ANDr_B(); break;
            case 0xA1: debug_message_from_op('case 0xA1'); this.op.ANDr_C(); break;
            case 0xA2: debug_message_from_op('case 0xA2'); this.op.ANDr_D(); break;
            case 0xA3: debug_message_from_op('case 0xA3'); this.op.ANDr_E(); break;
            case 0xA4: debug_message_from_op('case 0xA4'); this.op.ANDr_H(); break;
            case 0xA5: debug_message_from_op('case 0xA5'); this.op.ANDr_L(); break;
            case 0xA6: debug_message_from_op('case 0xA6'); this.op.ANDrHL(); break;
            case 0xA7: debug_message_from_op('case 0xA7'); this.op.ANDr_A(); break;
            case 0xA8: debug_message_from_op('case 0xA8'); this.op.XORr_B(); break;
            case 0xA9: debug_message_from_op('case 0xA9'); this.op.XORr_C(); break;
            case 0xAA: debug_message_from_op('case 0xAA'); this.op.XORr_D(); break;
            case 0xAB: debug_message_from_op('case 0xAB'); this.op.XORr_E(); break;
            case 0xAC: debug_message_from_op('case 0xAC'); this.op.XORr_H(); break;
            case 0xAD: debug_message_from_op('case 0xAD'); this.op.XORr_L(); break;
            case 0xAE: debug_message_from_op('case 0xAE'); this.op.XORHL(); break;
            case 0xAF: debug_message_from_op('case 0xAF'); this.op.XORr_A(); break;
            // 0xB0                       
            case 0xB0: debug_message_from_op('case 0xB0'); this.op.ORr_B(); break;
            case 0xB1: debug_message_from_op('case 0xB1'); this.op.ORr_C(); break;
            case 0xB2: debug_message_from_op('case 0xB2'); this.op.ORr_D(); break;
            case 0xB3: debug_message_from_op('case 0xB3'); this.op.ORr_E(); break;
            case 0xB4: debug_message_from_op('case 0xB4'); this.op.ORr_H(); break;
            case 0xB5: debug_message_from_op('case 0xB5'); this.op.ORr_L(); break;
            case 0xB6: debug_message_from_op('case 0xB6'); this.op.ORHL(); break;
            case 0xB7: debug_message_from_op('case 0xB7'); this.op.ORr_A(); break;
            case 0xB8: debug_message_from_op('case 0xB8'); this.op.CPr_B(); break;
            case 0xB9: debug_message_from_op('case 0xB9'); this.op.CPr_C(); break;
            case 0xBA: debug_message_from_op('case 0xBA'); this.op.CPr_D(); break;
            case 0xBB: debug_message_from_op('case 0xBB'); this.op.CPr_E(); break;
            case 0xBC: debug_message_from_op('case 0xBC'); this.op.CPr_H(); break;
            case 0xBD: debug_message_from_op('case 0xBD'); this.op.CPr_L(); break;
            case 0xBE: debug_message_from_op('case 0xBE'); this.op.CPHL(); break;
            case 0xBF: debug_message_from_op('case 0xBF'); this.op.CPr_A(); break;
            // 0xC0                       
            case 0xC0: debug_message_from_op('case 0xC0'); this.op.RETcc_NZ(); break;
            case 0xC1: debug_message_from_op('case 0xC1'); this.op.POP_BC(); break;
            case 0xC2: debug_message_from_op('case 0xC2'); this.op.JPccnn_NZ(); break;
            case 0xC3: debug_message_from_op('case 0xC3'); this.op.JPnn(); break;
            case 0xC4: debug_message_from_op('case 0xC4'); this.op.CALLccnn_NZ(); break;
            case 0xC5: debug_message_from_op('case 0xC5'); this.op.PUSH_BC(); break;
            case 0xC6: debug_message_from_op('case 0xC6'); this.op.ADDAn(); break;
            case 0xC7: debug_message_from_op('case 0xC7'); this.op.RST_f(0x0); break;
            case 0xC8: debug_message_from_op('case 0xC8'); this.op.RETcc_Z(); break;
            case 0xC9: debug_message_from_op('case 0xC9'); this.op.RET(); break;
            case 0xCA: debug_message_from_op('case 0xCA'); this.op.JPccnn_Z(); break;
            case 0xCB:
                debug_message_from_op('case 0xCB');
                var opcode = memory_read_8bit(this.reg.PC);
                this.reg.PC = this.reg.PC + 1;
                this.cbcode(opcode);
                break;
            case 0xCC: debug_message_from_op('case 0xCC'); this.op.CALLccnn_Z(); break;
            case 0xCD: debug_message_from_op('case 0xCD'); this.op.CALLnn(); break;
            case 0xCE: debug_message_from_op('case 0xCE'); this.op.SBCn(); break;
            case 0xCF: debug_message_from_op('case 0xCF'); this.op.RST_f(0x8); break;
            // 0xD0                       
            case 0xD0: debug_message_from_op('case 0xD0'); this.op.RETcc_NZ(); break;
            case 0xD1: debug_message_from_op('case 0xD1'); this.op.POP_DE(); break;
            case 0xD2: debug_message_from_op('case 0xD2'); this.op.JPccnn_NC(); break;
            case 0xD3: debug_message_from_op('case 0xD3'); break; // xx
            case 0xD4: debug_message_from_op('case 0xD4'); this.op.CALLccnn_NC(); break;
            case 0xD5: debug_message_from_op('case 0xD5'); this.op.PUSH_DE(); break;
            case 0xD6: debug_message_from_op('case 0xD6'); this.op.SUBn(); break;
            case 0xD7: debug_message_from_op('case 0xD7'); this.op.RST_f(0x10); break;
            case 0xD8: debug_message_from_op('case 0xD8'); this.op.RETcc_Z(); break;
            case 0xD9: debug_message_from_op('case 0xD9'); this.op.RET(); break;
            case 0xDA: debug_message_from_op('case 0xDA'); this.op.JPccnn_C(); break;
            case 0xDB: debug_message_from_op('case 0xDB'); break; // xx
            case 0xDC: debug_message_from_op('case 0xDC'); this.op.CALLccnn_C(); break;
            case 0xDD: debug_message_from_op('case 0xDD'); break; // xx
            case 0xDE: debug_message_from_op('case 0xDE'); this.op.SBCn(); break;
            case 0xDF: debug_message_from_op('case 0xDF'); this.op.RST_f(0x18); break;
            // 0xE0                       
            case 0xE0: debug_message_from_op('case 0xE0'); this.op.LDHnA(); break;
            case 0xE1: debug_message_from_op('case 0xE1'); this.op.POP_HL(); break;
            case 0xE2: debug_message_from_op('case 0xE2'); this.op.LDCA(); break;
            case 0xE3: debug_message_from_op('case 0xE3'); break; // xx
            case 0xE4: debug_message_from_op('case 0xE4'); break; // xx
            case 0xE5: debug_message_from_op('case 0xE5'); this.op.PUSH_HL(); break;
            case 0xE6: debug_message_from_op('case 0xE6'); this.op.ANDrn(); break;
            case 0xE7: debug_message_from_op('case 0xE7'); this.op.RST_f(0x20); break;
            case 0xE8: debug_message_from_op('case 0xE8'); this.op.ADDSPe(); break;
            case 0xE9: debug_message_from_op('case 0xE9'); this.op.JPHL(); break;
            case 0xEA: debug_message_from_op('case 0xEA'); this.op.LDddA_nn(); break;
            case 0xEB: debug_message_from_op('case 0xEB'); break; // xx
            case 0xEC: debug_message_from_op('case 0xEC'); break; // xx
            case 0xED: debug_message_from_op('case 0xED'); break; // xx
            case 0xEE: debug_message_from_op('case 0xEE'); this.op.XORn(); break;
            case 0xEF: debug_message_from_op('case 0xEF'); this.op.RST_f(0x28); break;
            // 0xF0                       
            case 0xF0: debug_message_from_op('case 0xF0'); this.op.LDHAn(); break;
            case 0xF1: debug_message_from_op('case 0xF1'); this.op.POP_AF(); break;
            case 0xF2: debug_message_from_op('case 0xF2'); break; // xx
            case 0xF3: debug_message_from_op('case 0xF3'); this.op.DI(); break;
            case 0xF4: debug_message_from_op('case 0xF4'); break; // xx
            case 0xF5: debug_message_from_op('case 0xF5'); this.op.PUSH_AF(); break;
            case 0xF6: debug_message_from_op('case 0xF6'); this.op.ORn(); break;
            case 0xF7: debug_message_from_op('case 0xF7'); this.op.RST_f(0x30); break;
            case 0xF8: debug_message_from_op('case 0xF8'); this.op.LDHLSPe(); break;
            case 0xF9: debug_message_from_op('case 0xF9'); this.op.LDSPHL(); break;
            case 0xFA: debug_message_from_op('case 0xFA'); this.op.LDAss_nn(); break;
            case 0xFB: debug_message_from_op('case 0xFB'); this.op.EI(); break;
            case 0xFC: debug_message_from_op('case 0xFC'); break; // xx
            case 0xFD: debug_message_from_op('case 0xFD'); break; // xx
            case 0xFE: debug_message_from_op('case 0xFE'); this.op.CPn(); break;
            case 0xFF: debug_message_from_op('case 0xFF'); this.op.RST_f(0x38); break;
        }
    },
    cbcode: function (opcode) {
        switch (opcode) {
            // 0x00                       
            case 0x00: debug_message_from_op(' case 0x00'); this.op.RLCr_B(); break;
            case 0x01: debug_message_from_op(' case 0x01'); this.op.RLCr_C(); break;
            case 0x02: debug_message_from_op(' case 0x02'); this.op.RLCr_D(); break;
            case 0x03: debug_message_from_op(' case 0x03'); this.op.RLCr_E(); break;
            case 0x04: debug_message_from_op(' case 0x04'); this.op.RLCr_H(); break;
            case 0x05: debug_message_from_op(' case 0x05'); this.op.RLCr_L(); break;
            case 0x06: debug_message_from_op(' case 0x06'); this.op.RLCHL(); break;
            case 0x07: debug_message_from_op(' case 0x07'); this.op.RLCr_A(); break;
            case 0x08: debug_message_from_op(' case 0x08'); this.op.RRCr_B(); break;
            case 0x09: debug_message_from_op(' case 0x09'); this.op.RRCr_C(); break;
            case 0x0A: debug_message_from_op(' case 0x0A'); this.op.RRCr_D(); break;
            case 0x0B: debug_message_from_op(' case 0x0B'); this.op.RRCr_E(); break;
            case 0x0C: debug_message_from_op(' case 0x0C'); this.op.RRCr_H(); break;
            case 0x0D: debug_message_from_op(' case 0x0D'); this.op.RRCr_L(); break;
            case 0x0E: debug_message_from_op(' case 0x0E'); this.op.RRCHL(); break;
            case 0x0F: debug_message_from_op(' case 0x0F'); this.op.RRCr_A(); break;
            // 0x10                       
            case 0x10: debug_message_from_op(' case 0x10'); this.op.RLr_B(); break;
            case 0x11: debug_message_from_op(' case 0x11'); this.op.RLr_C(); break;
            case 0x12: debug_message_from_op(' case 0x12'); this.op.RLr_D(); break;
            case 0x13: debug_message_from_op(' case 0x13'); this.op.RLr_E(); break;
            case 0x14: debug_message_from_op(' case 0x14'); this.op.RLr_H(); break;
            case 0x15: debug_message_from_op(' case 0x15'); this.op.RLr_L(); break;
            case 0x16: debug_message_from_op(' case 0x16'); this.op.RLHL(); break;
            case 0x17: debug_message_from_op(' case 0x17'); this.op.RLr_A(); break;
            case 0x18: debug_message_from_op(' case 0x18'); this.op.RRr_B(); break;
            case 0x19: debug_message_from_op(' case 0x19'); this.op.RRr_C(); break;
            case 0x1A: debug_message_from_op(' case 0x1A'); this.op.RRr_D(); break;
            case 0x1B: debug_message_from_op(' case 0x1B'); this.op.RRr_E(); break;
            case 0x1C: debug_message_from_op(' case 0x1C'); this.op.RRr_H(); break;
            case 0x1D: debug_message_from_op(' case 0x1D'); this.op.RRr_L(); break;
            case 0x1E: debug_message_from_op(' case 0x1E'); this.op.RRHL(); break;
            case 0x1F: debug_message_from_op(' case 0x1F'); this.op.RRr_A(); break;
            // 0x20                       
            case 0x20: debug_message_from_op(' case 0x20'); this.op.SLAr_B(); break;
            case 0x21: debug_message_from_op(' case 0x21'); this.op.SLAr_C(); break;
            case 0x22: debug_message_from_op(' case 0x22'); this.op.SLAr_D(); break;
            case 0x23: debug_message_from_op(' case 0x23'); this.op.SLAr_E(); break;
            case 0x24: debug_message_from_op(' case 0x24'); this.op.SLAr_H(); break;
            case 0x25: debug_message_from_op(' case 0x25'); this.op.SLAr_L(); break;
            case 0x26: debug_message_from_op(' case 0x26'); this.op.SLAHL(); break;
            case 0x27: debug_message_from_op(' case 0x27'); this.op.SLAr_A(); break;
            case 0x28: debug_message_from_op(' case 0x28'); this.op.SRAr_B(); break;
            case 0x29: debug_message_from_op(' case 0x29'); this.op.SRAr_C(); break;
            case 0x2A: debug_message_from_op(' case 0x2A'); this.op.SRAr_D(); break;
            case 0x2B: debug_message_from_op(' case 0x2B'); this.op.SRAr_E(); break;
            case 0x2C: debug_message_from_op(' case 0x2C'); this.op.SRAr_H(); break;
            case 0x2D: debug_message_from_op(' case 0x2D'); this.op.SRAr_L(); break;
            case 0x2E: debug_message_from_op(' case 0x2E'); this.op.SRAHL(); break;
            case 0x2F: debug_message_from_op(' case 0x2F'); this.op.SRAr_A(); break;
            // 0x30                       
            case 0x30: debug_message_from_op(' case 0x30'); this.op.SWAPr_B(); break;
            case 0x31: debug_message_from_op(' case 0x31'); this.op.SWAPr_C(); break;
            case 0x32: debug_message_from_op(' case 0x32'); this.op.SWAPr_D(); break;
            case 0x33: debug_message_from_op(' case 0x33'); this.op.SWAPr_E(); break;
            case 0x34: debug_message_from_op(' case 0x34'); this.op.SWAPr_H(); break;
            case 0x35: debug_message_from_op(' case 0x35'); this.op.SWAPr_L(); break;
            case 0x36: debug_message_from_op(' case 0x36'); this.op.SWAPHL(); break;
            case 0x37: debug_message_from_op(' case 0x37'); this.op.SWAPr_A(); break;
            case 0x38: debug_message_from_op(' case 0x38'); this.op.SRLr_B(); break;
            case 0x39: debug_message_from_op(' case 0x39'); this.op.SRLr_C(); break;
            case 0x3A: debug_message_from_op(' case 0x3A'); this.op.SRLr_D(); break;
            case 0x3B: debug_message_from_op(' case 0x3B'); this.op.SRLr_E(); break;
            case 0x3C: debug_message_from_op(' case 0x3C'); this.op.SRLr_H(); break;
            case 0x3D: debug_message_from_op(' case 0x3D'); this.op.SRLr_L(); break;
            case 0x3E: debug_message_from_op(' case 0x3E'); this.op.SRLHL(); break;
            case 0x3F: debug_message_from_op(' case 0x3F'); this.op.SRLr_A(); break;
            // 0x40                       
            case 0x40: debug_message_from_op(' case 0x40'); this.op.BITr_B(0); break;
            case 0x41: debug_message_from_op(' case 0x41'); this.op.BITr_C(0); break;
            case 0x42: debug_message_from_op(' case 0x42'); this.op.BITr_D(0); break;
            case 0x43: debug_message_from_op(' case 0x43'); this.op.BITr_E(0); break;
            case 0x44: debug_message_from_op(' case 0x44'); this.op.BITr_H(0); break;
            case 0x45: debug_message_from_op(' case 0x45'); this.op.BITr_L(0); break;
            case 0x46: debug_message_from_op(' case 0x46'); this.op.BITHL(0); break;
            case 0x47: debug_message_from_op(' case 0x47'); this.op.BITr_A(0); break;
            case 0x48: debug_message_from_op(' case 0x48'); this.op.BITr_B(1); break;
            case 0x49: debug_message_from_op(' case 0x49'); this.op.BITr_C(1); break;
            case 0x4A: debug_message_from_op(' case 0x4A'); this.op.BITr_D(1); break;
            case 0x4B: debug_message_from_op(' case 0x4B'); this.op.BITr_E(1); break;
            case 0x4C: debug_message_from_op(' case 0x4C'); this.op.BITr_H(1); break;
            case 0x4D: debug_message_from_op(' case 0x4D'); this.op.BITr_L(1); break;
            case 0x4E: debug_message_from_op(' case 0x4E'); this.op.BITHL(1); break;
            case 0x4F: debug_message_from_op(' case 0x4F'); this.op.BITr_A(1); break;
            // 0x50                       
            case 0x50: debug_message_from_op(' case 0x50'); this.op.BITr_B(2); break;
            case 0x51: debug_message_from_op(' case 0x51'); this.op.BITr_C(2); break;
            case 0x52: debug_message_from_op(' case 0x52'); this.op.BITr_D(2); break;
            case 0x53: debug_message_from_op(' case 0x53'); this.op.BITr_E(2); break;
            case 0x54: debug_message_from_op(' case 0x54'); this.op.BITr_H(2); break;
            case 0x55: debug_message_from_op(' case 0x55'); this.op.BITr_L(2); break;
            case 0x56: debug_message_from_op(' case 0x56'); this.op.BITHL(2); break;
            case 0x57: debug_message_from_op(' case 0x57'); this.op.BITr_A(2); break;
            case 0x58: debug_message_from_op(' case 0x58'); this.op.BITr_B(3); break;
            case 0x59: debug_message_from_op(' case 0x59'); this.op.BITr_C(3); break;
            case 0x5A: debug_message_from_op(' case 0x5A'); this.op.BITr_D(3); break;
            case 0x5B: debug_message_from_op(' case 0x5B'); this.op.BITr_E(3); break;
            case 0x5C: debug_message_from_op(' case 0x5C'); this.op.BITr_H(3); break;
            case 0x5D: debug_message_from_op(' case 0x5D'); this.op.BITr_L(3); break;
            case 0x5E: debug_message_from_op(' case 0x5E'); this.op.BITHL(3); break;
            case 0x5F: debug_message_from_op(' case 0x5F'); this.op.BITr_A(3); break;
            // 0x60                       
            case 0x60: debug_message_from_op(' case 0x60'); this.op.BITr_B(4); break;
            case 0x61: debug_message_from_op(' case 0x61'); this.op.BITr_C(4); break;
            case 0x62: debug_message_from_op(' case 0x62'); this.op.BITr_D(4); break;
            case 0x63: debug_message_from_op(' case 0x63'); this.op.BITr_E(4); break;
            case 0x64: debug_message_from_op(' case 0x64'); this.op.BITr_H(4); break;
            case 0x65: debug_message_from_op(' case 0x65'); this.op.BITr_L(4); break;
            case 0x66: debug_message_from_op(' case 0x66'); this.op.BITHL(4); break;
            case 0x67: debug_message_from_op(' case 0x67'); this.op.BITr_A(4); break;
            case 0x68: debug_message_from_op(' case 0x68'); this.op.BITr_B(5); break;
            case 0x69: debug_message_from_op(' case 0x69'); this.op.BITr_C(5); break;
            case 0x6A: debug_message_from_op(' case 0x6A'); this.op.BITr_D(5); break;
            case 0x6B: debug_message_from_op(' case 0x6B'); this.op.BITr_E(5); break;
            case 0x6C: debug_message_from_op(' case 0x6C'); this.op.BITr_H(5); break;
            case 0x6D: debug_message_from_op(' case 0x6D'); this.op.BITr_L(5); break;
            case 0x6E: debug_message_from_op(' case 0x6E'); this.op.BITHL(5); break;
            case 0x6F: debug_message_from_op(' case 0x6F'); this.op.BITr_A(5); break;
            // 0x70                       
            case 0x70: debug_message_from_op(' case 0x70'); this.op.BITr_B(6); break;
            case 0x71: debug_message_from_op(' case 0x71'); this.op.BITr_C(6); break;
            case 0x72: debug_message_from_op(' case 0x72'); this.op.BITr_D(6); break;
            case 0x73: debug_message_from_op(' case 0x73'); this.op.BITr_E(6); break;
            case 0x74: debug_message_from_op(' case 0x74'); this.op.BITr_H(6); break;
            case 0x75: debug_message_from_op(' case 0x75'); this.op.BITr_L(6); break;
            case 0x76: debug_message_from_op(' case 0x76'); this.op.BITHL(6); break;
            case 0x77: debug_message_from_op(' case 0x77'); this.op.BITr_A(6); break;
            case 0x78: debug_message_from_op(' case 0x78'); this.op.BITr_B(7); break;
            case 0x79: debug_message_from_op(' case 0x79'); this.op.BITr_C(7); break;
            case 0x7A: debug_message_from_op(' case 0x7A'); this.op.BITr_D(7); break;
            case 0x7B: debug_message_from_op(' case 0x7B'); this.op.BITr_E(7); break;
            case 0x7C: debug_message_from_op(' case 0x7C'); this.op.BITr_H(7); break;
            case 0x7D: debug_message_from_op(' case 0x7D'); this.op.BITr_L(7); break;
            case 0x7E: debug_message_from_op(' case 0x7E'); this.op.BITHL(7); break;
            case 0x7F: debug_message_from_op(' case 0x7F'); this.op.BITr_A(7); break;
            // 0x80                       
            case 0x80: debug_message_from_op(' case 0x80'); this.op.RESr_B(0); break;
            case 0x81: debug_message_from_op(' case 0x81'); this.op.RESr_C(0); break;
            case 0x82: debug_message_from_op(' case 0x82'); this.op.RESr_D(0); break;
            case 0x83: debug_message_from_op(' case 0x83'); this.op.RESr_E(0); break;
            case 0x84: debug_message_from_op(' case 0x84'); this.op.RESr_H(0); break;
            case 0x85: debug_message_from_op(' case 0x85'); this.op.RESr_L(0); break;
            case 0x86: debug_message_from_op(' case 0x86'); this.op.RESHL(0); break;
            case 0x87: debug_message_from_op(' case 0x87'); this.op.RESr_A(0); break;
            case 0x88: debug_message_from_op(' case 0x88'); this.op.RESr_B(1); break;
            case 0x89: debug_message_from_op(' case 0x89'); this.op.RESr_C(1); break;
            case 0x8A: debug_message_from_op(' case 0x8A'); this.op.RESr_D(1); break;
            case 0x8B: debug_message_from_op(' case 0x8B'); this.op.RESr_E(1); break;
            case 0x8C: debug_message_from_op(' case 0x8C'); this.op.RESr_H(1); break;
            case 0x8D: debug_message_from_op(' case 0x8D'); this.op.RESr_L(1); break;
            case 0x8E: debug_message_from_op(' case 0x8E'); this.op.RESHL(1); break;
            case 0x8F: debug_message_from_op(' case 0x8F'); this.op.RESr_A(1); break;
            // 0x90                       
            case 0x90: debug_message_from_op(' case 0x90'); this.op.RESr_B(2); break;
            case 0x91: debug_message_from_op(' case 0x91'); this.op.RESr_C(2); break;
            case 0x92: debug_message_from_op(' case 0x92'); this.op.RESr_D(2); break;
            case 0x93: debug_message_from_op(' case 0x93'); this.op.RESr_E(2); break;
            case 0x94: debug_message_from_op(' case 0x94'); this.op.RESr_H(2); break;
            case 0x95: debug_message_from_op(' case 0x95'); this.op.RESr_L(2); break;
            case 0x96: debug_message_from_op(' case 0x96'); this.op.RESHL(2); break;
            case 0x97: debug_message_from_op(' case 0x97'); this.op.RESr_A(2); break;
            case 0x98: debug_message_from_op(' case 0x98'); this.op.RESr_B(3); break;
            case 0x99: debug_message_from_op(' case 0x99'); this.op.RESr_C(3); break;
            case 0x9A: debug_message_from_op(' case 0x9A'); this.op.RESr_D(3); break;
            case 0x9B: debug_message_from_op(' case 0x9B'); this.op.RESr_E(3); break;
            case 0x9C: debug_message_from_op(' case 0x9C'); this.op.RESr_H(3); break;
            case 0x9D: debug_message_from_op(' case 0x9D'); this.op.RESr_L(3); break;
            case 0x9E: debug_message_from_op(' case 0x9E'); this.op.RESHL(3); break;
            case 0x9F: debug_message_from_op(' case 0x9F'); this.op.RESr_A(3); break;
            // 0xA0                       
            case 0xA0: debug_message_from_op(' case 0xA0'); this.op.RESr_B(4); break;
            case 0xA1: debug_message_from_op(' case 0xA1'); this.op.RESr_C(4); break;
            case 0xA2: debug_message_from_op(' case 0xA2'); this.op.RESr_D(4); break;
            case 0xA3: debug_message_from_op(' case 0xA3'); this.op.RESr_E(4); break;
            case 0xA4: debug_message_from_op(' case 0xA4'); this.op.RESr_H(4); break;
            case 0xA5: debug_message_from_op(' case 0xA5'); this.op.RESr_L(4); break;
            case 0xA6: debug_message_from_op(' case 0xA6'); this.op.RESHL(4); break;
            case 0xA7: debug_message_from_op(' case 0xA7'); this.op.RESr_A(4); break;
            case 0xA8: debug_message_from_op(' case 0xA8'); this.op.RESr_B(5); break;
            case 0xA9: debug_message_from_op(' case 0xA9'); this.op.RESr_C(5); break;
            case 0xAA: debug_message_from_op(' case 0xAA'); this.op.RESr_D(5); break;
            case 0xAB: debug_message_from_op(' case 0xAB'); this.op.RESr_E(5); break;
            case 0xAC: debug_message_from_op(' case 0xAC'); this.op.RESr_H(5); break;
            case 0xAD: debug_message_from_op(' case 0xAD'); this.op.RESr_L(5); break;
            case 0xAE: debug_message_from_op(' case 0xAE'); this.op.RESHL(5); break;
            case 0xAF: debug_message_from_op(' case 0xAF'); this.op.RESr_A(5); break;
            // 0xB0                       
            case 0xB0: debug_message_from_op(' case 0xB0'); this.op.RESr_B(6); break;
            case 0xB1: debug_message_from_op(' case 0xB1'); this.op.RESr_C(6); break;
            case 0xB2: debug_message_from_op(' case 0xB2'); this.op.RESr_D(6); break;
            case 0xB3: debug_message_from_op(' case 0xB3'); this.op.RESr_E(6); break;
            case 0xB4: debug_message_from_op(' case 0xB4'); this.op.RESr_H(6); break;
            case 0xB5: debug_message_from_op(' case 0xB5'); this.op.RESr_L(6); break;
            case 0xB6: debug_message_from_op(' case 0xB6'); this.op.RESHL(6); break;
            case 0xB7: debug_message_from_op(' case 0xB7'); this.op.RESr_A(6); break;
            case 0xB8: debug_message_from_op(' case 0xB8'); this.op.RESr_B(7); break;
            case 0xB9: debug_message_from_op(' case 0xB9'); this.op.RESr_C(7); break;
            case 0xBA: debug_message_from_op(' case 0xBA'); this.op.RESr_D(7); break;
            case 0xBB: debug_message_from_op(' case 0xBB'); this.op.RESr_E(7); break;
            case 0xBC: debug_message_from_op(' case 0xBC'); this.op.RESr_H(7); break;
            case 0xBD: debug_message_from_op(' case 0xBD'); this.op.RESr_L(7); break;
            case 0xBE: debug_message_from_op(' case 0xBE'); this.op.RESHL(7); break;
            case 0xBF: debug_message_from_op(' case 0xBF'); this.op.RESr_A(7); break;
            // 0xC0                       
            case 0xC0: debug_message_from_op(' case 0xC0'); this.op.SETr_B(0); break;
            case 0xC1: debug_message_from_op(' case 0xC1'); this.op.SETr_C(0); break;
            case 0xC2: debug_message_from_op(' case 0xC2'); this.op.SETr_D(0); break;
            case 0xC3: debug_message_from_op(' case 0xC3'); this.op.SETr_E(0); break;
            case 0xC4: debug_message_from_op(' case 0xC4'); this.op.SETr_H(0); break;
            case 0xC5: debug_message_from_op(' case 0xC5'); this.op.SETr_L(0); break;
            case 0xC6: debug_message_from_op(' case 0xC6'); this.op.SETHL(0); break;
            case 0xC7: debug_message_from_op(' case 0xC7'); this.op.SETr_A(0); break;
            case 0xC8: debug_message_from_op(' case 0xC8'); this.op.SETr_B(1); break;
            case 0xC9: debug_message_from_op(' case 0xC9'); this.op.SETr_C(1); break;
            case 0xCA: debug_message_from_op(' case 0xCA'); this.op.SETr_D(1); break;
            case 0xCB: debug_message_from_op(' case 0xCB'); this.op.SETr_E(1); break;
            case 0xCC: debug_message_from_op(' case 0xCC'); this.op.SETr_H(1); break;
            case 0xCD: debug_message_from_op(' case 0xCD'); this.op.SETr_L(1); break;
            case 0xCE: debug_message_from_op(' case 0xCE'); this.op.SETHL(1); break;
            case 0xCF: debug_message_from_op(' case 0xCF'); this.op.SETr_A(1); break;
            // 0xD0                       
            case 0xD0: debug_message_from_op(' case 0xD0'); this.op.SETr_B(2); break;
            case 0xD1: debug_message_from_op(' case 0xD1'); this.op.SETr_C(2); break;
            case 0xD2: debug_message_from_op(' case 0xD2'); this.op.SETr_D(2); break;
            case 0xD3: debug_message_from_op(' case 0xD3'); this.op.SETr_E(2); break;
            case 0xD4: debug_message_from_op(' case 0xD4'); this.op.SETr_H(2); break;
            case 0xD5: debug_message_from_op(' case 0xD5'); this.op.SETr_L(2); break;
            case 0xD6: debug_message_from_op(' case 0xD6'); this.op.SETHL(2); break;
            case 0xD7: debug_message_from_op(' case 0xD7'); this.op.SETr_A(2); break;
            case 0xD8: debug_message_from_op(' case 0xD8'); this.op.SETr_B(3); break;
            case 0xD9: debug_message_from_op(' case 0xD9'); this.op.SETr_C(3); break;
            case 0xDA: debug_message_from_op(' case 0xDA'); this.op.SETr_D(3); break;
            case 0xDB: debug_message_from_op(' case 0xDB'); this.op.SETr_E(3); break;
            case 0xDC: debug_message_from_op(' case 0xDC'); this.op.SETr_H(3); break;
            case 0xDD: debug_message_from_op(' case 0xDD'); this.op.SETr_L(3); break;
            case 0xDE: debug_message_from_op(' case 0xDE'); this.op.SETHL(3); break;
            case 0xDF: debug_message_from_op(' case 0xDF'); this.op.SETr_A(3); break;
            // 0xE0                       
            case 0xE0: debug_message_from_op(' case 0xE0'); this.op.SETr_B(4); break;
            case 0xE1: debug_message_from_op(' case 0xE1'); this.op.SETr_C(4); break;
            case 0xE2: debug_message_from_op(' case 0xE2'); this.op.SETr_D(4); break;
            case 0xE3: debug_message_from_op(' case 0xE3'); this.op.SETr_E(4); break;
            case 0xE4: debug_message_from_op(' case 0xE4'); this.op.SETr_H(4); break;
            case 0xE5: debug_message_from_op(' case 0xE5'); this.op.SETr_L(4); break;
            case 0xE6: debug_message_from_op(' case 0xE6'); this.op.SETHL(4); break;
            case 0xE7: debug_message_from_op(' case 0xE7'); this.op.SETr_A(4); break;
            case 0xE8: debug_message_from_op(' case 0xE8'); this.op.SETr_B(5); break;
            case 0xE9: debug_message_from_op(' case 0xE9'); this.op.SETr_C(5); break;
            case 0xEA: debug_message_from_op(' case 0xEA'); this.op.SETr_D(5); break;
            case 0xEB: debug_message_from_op(' case 0xEB'); this.op.SETr_E(5); break;
            case 0xEC: debug_message_from_op(' case 0xEC'); this.op.SETr_H(5); break;
            case 0xED: debug_message_from_op(' case 0xED'); this.op.SETr_L(5); break;
            case 0xEE: debug_message_from_op(' case 0xEE'); this.op.SETHL(5); break;
            case 0xEF: debug_message_from_op(' case 0xEF'); this.op.SETr_A(5); break;
            // 0xF0                       
            case 0xF0: debug_message_from_op(' case 0xF0'); this.op.SETr_B(6); break;
            case 0xF1: debug_message_from_op(' case 0xF1'); this.op.SETr_C(6); break;
            case 0xF2: debug_message_from_op(' case 0xF2'); this.op.SETr_D(6); break;
            case 0xF3: debug_message_from_op(' case 0xF3'); this.op.SETr_E(6); break;
            case 0xF4: debug_message_from_op(' case 0xF4'); this.op.SETr_H(6); break;
            case 0xF5: debug_message_from_op(' case 0xF5'); this.op.SETr_L(6); break;
            case 0xF6: debug_message_from_op(' case 0xF6'); this.op.SETHL(6); break;
            case 0xF7: debug_message_from_op(' case 0xF7'); this.op.SETr_A(6); break;
            case 0xF8: debug_message_from_op(' case 0xF8'); this.op.SETr_B(7); break;
            case 0xF9: debug_message_from_op(' case 0xF9'); this.op.SETr_C(7); break;
            case 0xFA: debug_message_from_op(' case 0xFA'); this.op.SETr_D(7); break;
            case 0xFB: debug_message_from_op(' case 0xFB'); this.op.SETr_E(7); break;
            case 0xFC: debug_message_from_op(' case 0xFC'); this.op.SETr_H(7); break;
            case 0xFD: debug_message_from_op(' case 0xFD'); this.op.SETr_L(7); break;
            case 0xFE: debug_message_from_op(' case 0xFE'); this.op.SETHL(7); break;
            case 0xFF: debug_message_from_op(' case 0xFF'); this.op.SETr_A(7); break;
        }
    },
    toString: function () {
        return '' +
                'clocks: ' + this.clock_count + '\n'+
                'A:' + to_hex(this.reg.A) + '(' + to_bin(this.reg.A) + ',' + this.reg.A + '),' +
                'B:' + to_hex(this.reg.B) + '(' + to_bin(this.reg.B) + ',' + this.reg.B + '),' +
                'D:' + to_hex(this.reg.D) + '(' + to_bin(this.reg.D) + ',' + this.reg.D + '),' +
                'H:' + to_hex(this.reg.H) + '(' + to_bin(this.reg.H) + ',' + this.reg.H + '),\n' +
                'C:' + to_hex(this.reg.C) + '(' + to_bin(this.reg.C) + ',' + this.reg.C + '),' +
                'E:' + to_hex(this.reg.E) + '(' + to_bin(this.reg.E) + ',' + this.reg.E + '),' +
                'L:' + to_hex(this.reg.L) + '(' + to_bin(this.reg.L) + ',' + this.reg.L + ')\n' +
                'F:' + to_hex(this.reg.F) + '(' + to_bin(this.reg.F) + ',' + this.reg.F + '), { ' +
                'FZ:' + to_hex(this.reg.FZ) + '(' + this.reg.FZ + '),' +
                'FN:' + to_hex(this.reg.FN) + '(' + this.reg.FN + '),' +
                'FH:' + to_hex(this.reg.FH) + '(' + this.reg.FH + '),' +
                'FC:' + to_hex(this.reg.FC) + '(' + this.reg.FC + ') }\n' +
                'SP:' + to_hex(this.reg.SP, 4) + '(' + this.reg.SP + '),' +
                'PC:' + to_hex(this.reg.PC, 4) + '(' + this.reg.PC + '),' +
                'I:' + to_hex(this.reg.I, 4) + '(' + this.reg.I + '),' +
                'R:' + to_hex(this.reg.R, 4) + '(' + this.reg.R + '),';
    }
};