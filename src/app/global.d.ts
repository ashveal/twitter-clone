import type { Database } from '@/lib/database.types'

declare global {
  type DatabaseSchema = Database
}
