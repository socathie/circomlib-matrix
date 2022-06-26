const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Matrix subtraction test", function () {
    this.timeout(100000000);

    it("should subtract two 2 by 3 matrices", async () => {
        const circuit = await wasm_tester(path.join(__dirname, "circuits", "matSub_test.circom"));
        //await circuit.loadConstraints();
        //assert.equal(circuit.nVars, 13);
        //assert.equal(circuit.constraints.length, 0);

        const INPUT = {
            "a": [["1","2","3"],["4","5","6"]],
            "b": [["7","8","9"],["1","2","3"]]
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        //console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1-7)));
        assert(Fr.eq(Fr.e(witness[2]),Fr.e(2-8)));
        assert(Fr.eq(Fr.e(witness[3]),Fr.e(3-9)));
        assert(Fr.eq(Fr.e(witness[4]),Fr.e(4-1)));
        assert(Fr.eq(Fr.e(witness[5]),Fr.e(5-2)));
        assert(Fr.eq(Fr.e(witness[6]),Fr.e(6-3)));
    });
});