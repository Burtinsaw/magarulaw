import type { Payload } from 'payload'

const words = [
  { wordAvar: 'Росдал', wordTurkish: 'Köy', wordRussian: 'Село', wordEnglish: 'Village', pronunciation: 'rosdal', partOfSpeech: 'noun', category: 'daily', difficulty: 'beginner', exampleAvar: 'Дир росдал гъоркьаб рукъ буго', exampleTurkish: 'Benim köyümde güzel bir ev var' },
  { wordAvar: 'Эбел', wordTurkish: 'Anne', wordRussian: 'Мать', wordEnglish: 'Mother', pronunciation: 'ebel', partOfSpeech: 'noun', category: 'family', difficulty: 'beginner', exampleAvar: 'Дир эбел цӀуяб нуж йиго', exampleTurkish: 'Annem genç bir kadındır' },
  { wordAvar: 'Эмен', wordTurkish: 'Baba', wordRussian: 'Отец', wordEnglish: 'Father', pronunciation: 'emen', partOfSpeech: 'noun', category: 'family', difficulty: 'beginner', exampleAvar: 'Дир эмен хъвараб чи вуго', exampleTurkish: 'Babam güçlü bir insandır' },
  { wordAvar: 'Рукъ', wordTurkish: 'Ev', wordRussian: 'Дом', wordEnglish: 'House', pronunciation: 'ruq', partOfSpeech: 'noun', category: 'home', difficulty: 'beginner', exampleAvar: 'Гьаб рукъ бакӀараб буго', exampleTurkish: 'Bu ev büyüktür' },
  { wordAvar: 'ЛъикӀ', wordTurkish: 'İyi', wordRussian: 'Хороший', wordEnglish: 'Good', pronunciation: "l'ik'", partOfSpeech: 'adjective', category: 'daily', difficulty: 'beginner', exampleAvar: 'ЛъикӀ буго', exampleTurkish: 'İyidir' },
  { wordAvar: 'Хӏинкъал', wordTurkish: 'Hinkal', wordRussian: 'Хинкал', wordEnglish: 'Hinkal', pronunciation: 'hinqal', partOfSpeech: 'noun', category: 'food', difficulty: 'beginner', exampleAvar: 'Эбелалъ хӏинкъал гьабуна', exampleTurkish: 'Annem hinkal yaptı' },
  { wordAvar: 'МацӀ', wordTurkish: 'Dil', wordRussian: 'Язык', wordEnglish: 'Language', pronunciation: "mac'", partOfSpeech: 'noun', category: 'daily', difficulty: 'beginner', exampleAvar: 'Авар мацӀ гӀемераб мацӀ буго', exampleTurkish: 'Avarca zengin bir dildir' },
  { wordAvar: 'Гъуниб', wordTurkish: 'Gunib', wordRussian: 'Гуниб', wordEnglish: 'Gunib', pronunciation: 'gunib', partOfSpeech: 'noun', category: 'travel', difficulty: 'beginner', exampleAvar: 'Гъуниб гъоркьаб мина буго', exampleTurkish: 'Gunib güzel bir yerdir' },
  { wordAvar: 'Салам', wordTurkish: 'Merhaba', wordRussian: 'Привет', wordEnglish: 'Hello', pronunciation: 'salam', partOfSpeech: 'interjection', category: 'greetings', difficulty: 'beginner', exampleAvar: 'Салам алейкум!', exampleTurkish: 'Selam aleyküm!' },
  { wordAvar: 'Баркала', wordTurkish: 'Teşekkürler', wordRussian: 'Спасибо', wordEnglish: 'Thank you', pronunciation: 'barkala', partOfSpeech: 'interjection', category: 'greetings', difficulty: 'beginner', exampleAvar: 'Баркала дуе!', exampleTurkish: 'Sana teşekkürler!' },
] as const

export async function seedDictionary(payload: Payload) {
  for (const word of words) {
    const existing = await payload.find({
      collection: 'dictionary',
      where: { wordAvar: { equals: word.wordAvar } },
    })

    if (existing.docs.length === 0) {
      await payload.create({ collection: 'dictionary', data: word as any })
      console.log(`Created word: ${word.wordAvar} = ${word.wordTurkish}`)
    }
  }
}
