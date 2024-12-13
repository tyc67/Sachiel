export const processPolicy = (data: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(data, 'text/html')

  const pageBody = doc.querySelector('.page-body')
  pageBody?.classList.add(
    'text-primary-700',
    'body-1',
    'flex',
    'flex-col',
    'gap-y-8'
  )

  const pageTitle = doc.querySelector('h1')
  pageTitle?.classList.add('hero-title', 'text-primary-700', 'mb-3')

  doc.querySelectorAll('p').forEach((p) => {
    if (!p.textContent?.trim()) {
      p.remove()
    }
  })

  const firstParagraph = pageBody?.querySelector('p')
  firstParagraph?.classList.add('footnote', 'text-primary-500')

  doc.querySelectorAll('strong').forEach((strong) => {
    const span = document.createElement('span')
    span.textContent = strong.textContent
    span.classList.add('title-1')
    strong.replaceWith(span)
  })

  doc.querySelectorAll('br').forEach((br) => {
    br?.remove()
  })

  return doc.body.innerHTML
}
