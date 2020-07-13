import db from './data'
import API from './api'
import { async } from './async'
import * as shopping from './shopping'

const extensions = { db: db, API: API, async: async, shopping: shopping }
Object.assign(window, extensions)
