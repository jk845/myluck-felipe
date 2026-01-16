import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { preloadImage, preloadImages } from '../preloadImages'

describe('preloadImages', () => {
  // Mock Image constructor
  let mockImage: any

  beforeEach(() => {
    mockImage = {
      onload: null,
      onerror: null,
      src: ''
    }
    
    // Mock Image constructor
    vi.stubGlobal('Image', vi.fn(() => mockImage))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('preloadImage', () => {
    it('should resolve when image loads successfully', async () => {
      const imageUrl = 'https://example.com/image.jpg'
      
      // Start preloading
      const promise = preloadImage(imageUrl)
      
      // Verify src was set
      expect(mockImage.src).toBe(imageUrl)
      
      // Simulate successful load
      mockImage.onload()
      
      // Should resolve without error
      await expect(promise).resolves.toBeUndefined()
    })

    it('should reject when image fails to load', async () => {
      const imageUrl = 'https://example.com/broken-image.jpg'
      const error = new Error('Failed to load image')
      
      // Start preloading
      const promise = preloadImage(imageUrl)
      
      // Verify src was set
      expect(mockImage.src).toBe(imageUrl)
      
      // Simulate load error
      mockImage.onerror(error)
      
      // Should reject with error
      await expect(promise).rejects.toBe(error)
    })

    it('should create new Image instance for each call', () => {
      const ImageConstructor = vi.mocked(Image)
      
      preloadImage('image1.jpg')
      preloadImage('image2.jpg')
      
      expect(ImageConstructor).toHaveBeenCalledTimes(2)
    })
  })

  describe('preloadImages', () => {
    it('should preload multiple images successfully', async () => {
      const imageUrls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ]
      
      // Keep track of created images
      const createdImages: any[] = []
      vi.stubGlobal('Image', vi.fn(() => {
        const img = {
          onload: null,
          onerror: null,
          src: ''
        }
        createdImages.push(img)
        return img
      }))
      
      // Start preloading
      const promise = preloadImages(imageUrls)
      
      // Verify all images were created
      expect(createdImages).toHaveLength(3)
      expect(createdImages[0].src).toBe(imageUrls[0])
      expect(createdImages[1].src).toBe(imageUrls[1])
      expect(createdImages[2].src).toBe(imageUrls[2])
      
      // Simulate all images loading successfully
      createdImages.forEach(img => img.onload())
      
      // Should resolve with array of voids
      const result = await promise
      expect(result).toHaveLength(3)
      expect(result).toEqual([undefined, undefined, undefined])
    })

    it('should reject if any image fails to load', async () => {
      const imageUrls = [
        'https://example.com/image1.jpg',
        'https://example.com/broken.jpg',
        'https://example.com/image3.jpg'
      ]
      
      // Keep track of created images
      const createdImages: any[] = []
      vi.stubGlobal('Image', vi.fn(() => {
        const img = {
          onload: null,
          onerror: null,
          src: ''
        }
        createdImages.push(img)
        return img
      }))
      
      // Start preloading
      const promise = preloadImages(imageUrls)
      
      // Simulate first image loading successfully
      createdImages[0].onload()
      
      // Simulate second image failing
      const error = new Error('Failed to load image')
      createdImages[1].onerror(error)
      
      // Should reject with the error
      await expect(promise).rejects.toBe(error)
    })

    it('should handle empty array', async () => {
      const result = await preloadImages([])
      expect(result).toEqual([])
    })

    it('should handle single image array', async () => {
      const imageUrl = 'https://example.com/single.jpg'
      
      // Start preloading
      const promise = preloadImages([imageUrl])
      
      // Simulate successful load
      mockImage.onload()
      
      // Should resolve with single element array
      const result = await promise
      expect(result).toHaveLength(1)
      expect(result[0]).toBeUndefined()
    })
  })
})