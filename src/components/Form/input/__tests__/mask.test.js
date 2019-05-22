import mask from '../mask'

describe('mask', function () {
  it('Should accept only digits', function () {
    expect(mask('00000', 'a3jej44 ')).toBe("344")
    expect(mask('00000', '1234567 ')).toBe("12345")
  })

  it('Should accept only alphas', function () {
    expect(mask('aaaaa', 'a3Jej44 ')).toBe("aJej")
    expect(mask('AAAAA', 'a3jeJ44 ')).toBe("ajeJ")
  })

  it('Should accept only upper alphas', function () {
    expect(mask('CCCCC', 'a3jEJ44 ')).toBe("EJ")
  })

  it('Should accept only lower alphas', function () {
    expect(mask('ccccc', 'a3jEJ44 ')).toBe("aj")
  })

  it('Should accept anything', function () {
    expect(mask('*****', 'a3jEJ44 ')).toBe("a3jEJ")
  })

  it('Should accept a mashup', function () {
    expect(mask('c0a**44', 'a3jEJ44 ')).toBe("a3jEJ44")
    expect(mask('c0a**44', 'a3JEJ44 ')).toBe("a3JEJ44")
    expect(mask('c0a**44', 'A3jEJ44 ')).toBe("j4")
  })

  it('Should escape the mask value and use the mask as a character as a literal', function () {
    expect(mask('-\\*\\a\\c\\C\\0******', 'a3jEJ44 ')).toBe("-*acC0a3jEJ4")
  })
})