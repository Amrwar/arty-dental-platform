import { describe, expect, it } from 'vitest'

import { categories, categoryIds, galleryItems, itemsInCategory } from './gallery'

describe('the gallery filters', () => {
  it('are offered', () => {
    expect(categories.length).toBeGreaterThan(1)
  })

  it('open on everything', () => {
    expect(categories[0].id).toBe('all')
  })

  it('label every filter', () => {
    for (const category of categories) {
      expect(category.label.trim().length).toBeGreaterThan(0)
    }
  })

  it('use each id once', () => {
    const ids = categoryIds()
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('the gallery items', () => {
  it('exist', () => {
    expect(galleryItems.length).toBeGreaterThan(0)
  })

  it('are filed under a filter that is offered', () => {
    for (const item of galleryItems) {
      expect(categoryIds()).toContain(item.category)
    }
  })

  it('are never filed under the catch-all itself', () => {
    for (const item of galleryItems) {
      expect(item.category).not.toBe('all')
    }
  })

  it('carry an id each, used once', () => {
    const ids = galleryItems.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('are titled and described', () => {
    for (const item of galleryItems) {
      expect(item.title.trim().length).toBeGreaterThan(0)
      expect(item.description.trim().length).toBeGreaterThan(0)
    }
  })

  it('load their image over https', () => {
    for (const item of galleryItems) {
      expect(item.image.startsWith('https://')).toBe(true)
    }
  })
})

describe('every filter', () => {
  it('has something behind it, so none of them opens an empty grid', () => {
    for (const id of categoryIds()) {
      expect(itemsInCategory(id).length).toBeGreaterThan(0)
    }
  })
})

describe('itemsInCategory', () => {
  it('shows everything under the catch-all', () => {
    expect(itemsInCategory('all')).toHaveLength(galleryItems.length)
  })

  it('shows only what is filed under a filter', () => {
    for (const item of itemsInCategory('clinic')) {
      expect(item.category).toBe('clinic')
    }
  })

  it('is empty for a filter nobody offers', () => {
    expect(itemsInCategory('nonsense')).toEqual([])
  })
})
