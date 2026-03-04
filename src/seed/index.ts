import { getPayload } from 'payload'
import config from '@payload-config'
import { seedCategories } from './categories'
import { seedDictionary } from './dictionary'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding categories...')
  await seedCategories(payload)

  console.log('Seeding dictionary...')
  await seedDictionary(payload)

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
