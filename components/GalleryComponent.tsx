'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export function GalleryComponent() {
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const imagesPerPage = 10

  useEffect(() => {
    fetchImages()
  }, [currentPage])

  async function fetchImages() {
    const { data, error, count } = await supabase
      .from('gallery')
      .select('*', { count: 'exact' })
      .range((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage - 1)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('画像の取得に失敗しました:', error)
    } else {
      setImages(data)
      setTotalPages(Math.ceil(count / imagesPerPage))
    }
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">ギャラリー</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id}>
              <CardContent className="p-4">
                <Image
                  src={image.url}
                  alt={image.comment}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="mt-2 text-sm text-gray-600">{image.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8 gap-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            前のページ
          </Button>
          <span className="self-center">
            {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            次のページ
          </Button>
        </div>
      </div>
  )
}