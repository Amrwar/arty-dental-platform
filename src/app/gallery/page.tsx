'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { categories, galleryItems } from '@/data/gallery'


export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  const openLightbox = (id: number) => setLightbox(id)
  const closeLightbox = () => setLightbox(null)

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightbox === null) return
    const currentIndex = filteredItems.findIndex(item => item.id === lightbox)
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1

    if (newIndex < 0) newIndex = filteredItems.length - 1
    if (newIndex >= filteredItems.length) newIndex = 0

    setLightbox(filteredItems[newIndex].id)
  }

  const currentItem = galleryItems.find(item => item.id === lightbox)

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 hero-gradient pattern-overlay overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent-teal/10 rounded-full blur-3xl animate-pulse-soft" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <span className="inline-block px-4 py-1.5 bg-accent-mint rounded-full text-accent-teal text-sm font-medium mb-4">
              Gallery
            </span>
            <h1 className="text-display-lg text-navy-900 mb-6">
              See Our{' '}
              <span className="text-gradient">Beautiful Results</span>
            </h1>
            <p className="text-body-lg text-navy-600 mb-8">
              Browse through our gallery of smile transformations, our state-of-the-art facility, and the team that makes it all possible.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Section background="white">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-6 py-2.5 rounded-full font-medium transition-all duration-300
                ${activeCategory === category.id
                  ? 'bg-navy-800 text-white shadow-btn'
                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className={`
                group relative rounded-3xl overflow-hidden cursor-pointer
                animate-scale-in shadow-card
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-2 capitalize">
                    {item.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-navy-100 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      {lightbox !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev') }}
            className="absolute left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next') }}
            className="absolute right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full animate-scale-in"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                width={1600}
                height={1200}
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
            <div className="text-center mt-6">
              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                {currentItem.title}
              </h3>
              <p className="text-navy-300">{currentItem.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <Section background="gradient" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display-md text-navy-900 mb-6">
            Ready for Your Transformation?
          </h2>
          <p className="text-body-lg text-navy-600 mb-8">
            Join the thousands of patients who have transformed their smiles with us. Your journey to a beautiful smile starts here.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/contact" size="lg">
              Book Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href="/services" variant="outline" size="lg">
              View Our Services
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
