
class Itune{
    constructor(){
        this._id = 0;
        this._name = "";
        this._type = 0;
        this._numberOfSearch = 0;
    }
    printIntroduction () {
        return `itunes name is ${this._name}. with id  ${this._id}`;
    }
}

module.exports = Itune;
