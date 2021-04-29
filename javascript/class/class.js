// constructor
// getter/setter
// method
// static method
// inheritance
// polymorphism

const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365

class Animal {
  static getRandomGender() {
    return Math.round(Math.random()) ? 'male' : 'female'
  }
  constructor(_father, _mother, _species, _gender, _bornAt) {
    this.species = _species
    this.gender = _gender || Animal.getRandomGender()
    this.bornAt = _bornAt || new Date()
    this.siblings = []
    this.father = _father
    this.mother = _mother
  }
  get age() {
    const now = new Date()
    const timePastBirth = (now.getTime() - this.bornAt.getTime())
    return timePastBirth / millisecondsPerYear
  }
  set age(years) {
    const nowTime = new Date().getTime()
    this.bornAt = new Date(nowTime - (years * millisecondsPerYear))
  }
  assureCoupleReproductivity(mate) {
    if (!this.species) {
      throw new Error('You must specify the animal species to reproduce it.')
    }
    if (this.species !== mate.species) {
      throw new Error('Only animals from the same species can reproduce.')
    }
    if (this.gender === mate.gender) {
      throw new Error('Only animals from opposite genders can reproduce.')
    }
  }
  reproduce(mate) {
    const father = mate.gender === 'male' ? mate : this
    const mother = mate.gender === 'female' ? mate : this

    const newBorn = new this.constructor(father, mother)
    father.siblings.push(newBorn)
    mother.siblings.push(newBorn)

    return newBorn
  }
}

class LimitedFertilityAnimal extends Animal {
  get isFertile() {
    return true
  }
  assureCoupleReproductivity(mate) {
    super.assureCoupleReproductivity(mate)
    if (!this.isFertile || !mate.isFertile) {
      throw new Error('Some individual of the couple isn\'t fertile.')
    }
  }
  reproduce(mate) {
    this.assureCoupleReproductivity(mate)
    return super.reproduce(mate)
  }
}

class MarineTurtle extends LimitedFertilityAnimal {
  constructor(_father, _mother, _gender = null) {
    super(_father, _mother, 'Dermochelys coriacea', _gender)
  }
  get isFertile() {
    return this.age >= 16
  }
}

class RiverTurtle extends LimitedFertilityAnimal {
  constructor(_father, _mother, _gender = null) {
    super(_father, _mother, 'Dermatemys D. mawii', _gender)
  }
  get isFertile() {
    return this.age >= 7
  }
}

const firstMarineMaleTurtle = new MarineTurtle(undefined, undefined, 'male')
firstMarineMaleTurtle.age = 17

const firstMarineFemaleTurtle = new MarineTurtle(undefined, undefined, 'female')
firstMarineFemaleTurtle.age = 22

const firstMarineSibling = firstMarineMaleTurtle.reproduce(firstMarineFemaleTurtle)

const firstRiverMaleTurtle = new RiverTurtle(undefined, undefined, 'male')
firstRiverMaleTurtle.age = 9

const firstRiverFemaleTurtle = new RiverTurtle(undefined, undefined, 'female')
firstRiverFemaleTurtle.age = 12

const firstRiverSibling = firstRiverMaleTurtle.reproduce(firstRiverFemaleTurtle)
