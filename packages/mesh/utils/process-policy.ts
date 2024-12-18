'use server'

import { JSDOM } from 'jsdom'

export const processPolicy = async (data: string) => {
  const dom = new JSDOM(data)
  const doc = dom.window.document as Document

  doc.querySelectorAll('p').forEach((p) => {
    if (!p.textContent?.trim()) {
      p.remove()
    }
  })

  return doc.body.innerHTML
}
