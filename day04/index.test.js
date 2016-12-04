const {EOL} = require('os')
const m = require('.')
const test = require('ava')

const {getLetterMapping, parseRooms, sumValidRooms, top5Letters} = m

test('getLetterMapping', t => {
  const expected = {
    a: 5,
    b: 3,
    x: 1,
    y: 1,
    z: 1
  }

  t.deepEqual(getLetterMapping('aaaaa-bbb-z-y-x'), expected)
})

test('parseRooms', t => {
  const expected = [
    {
      encryptedName: 'aaaaa-bbb-z-y-x',
      checksum: 'abxyz',
      sectorId: 123
    },
    {
      encryptedName: 'a-b-c-d-e-f-g-h',
      checksum: 'abcde',
      sectorId: 87
    }
  ]

  const rooms = `aaaaa-bbb-z-y-x-123[abxyz]${EOL}a-b-c-d-e-f-g-h-87[abcde]${EOL}`
  t.deepEqual(parseRooms(rooms), expected)
})

test('sumValidRooms', t => {
  const rooms = `aaaaa-bbb-z-y-x-123[abxyz]${EOL}a-b-c-d-e-f-g-h-87[abcde]${EOL}total-real-123[decoy]`

  t.is(sumValidRooms(rooms), 210)
})

test('top5Letters', t => {
  t.is(top5Letters('aaaaa-bbbe-z-y-x'), 'abexy')
  t.is(top5Letters('aoubshwq-pibbm-kcfygvcd-'), 'bcadf')
})
