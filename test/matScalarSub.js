const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Scalar subtraction to matrix test", function () {
    this.timeout(100000000);

    it("should subtract a scalar from a 2 by 3 matrix", async () => {
        const circuit = await wasm_tester(path.join(__dirname, "circuits", "matScalarSub_test.circom"));
        //await circuit.loadConstraints();
        //assert.equal(circuit.nVars, 8);
        //assert.equal(circuit.constraints.length, 0);

        const INPUT = {
            "a": [["1","2","3"],["4","5","6"]],
            "s": "3"
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        //console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1-3)));
        assert(Fr.eq(Fr.e(witness[2]),Fr.e(2-3)));
        assert(Fr.eq(Fr.e(witness[3]),Fr.e(3-3)));
        assert(Fr.eq(Fr.e(witness[4]),Fr.e(4-3)));
        assert(Fr.eq(Fr.e(witness[5]),Fr.e(5-3)));
        assert(Fr.eq(Fr.e(witness[6]),Fr.e(6-3)));
    });
});