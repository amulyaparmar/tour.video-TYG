'use client'

import { useState } from 'react'
import { ArrowLeft, Zap, Send, Play, Plus, X, Image as ImageIcon, Video, ExternalLink } from 'lucide-react'

type MediaItem = {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
};

export function ChatbotBuilderComponent() {
  const [websiteUrl, setWebsiteUrl] = useState('https://www.parktowneapthomes.com/')
  const [corpus, setCorpus] = useState('')
  const [extractedInfo, setExtractedInfo] = useState({
    businessName: 'Park Towne Place Apartments',
    phoneNumber: '',
    address: '',
    applyNowLink: '',
    viewPhotosLink: '',
    specialOffer: '',
    description: '',
    primaryColor: '',
    heroImage: '',
    heroVideo: ''
  })
  const [gradientBorder, setGradientBorder] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#dc2626')
  const [mediaGallery, setMediaGallery] = useState<MediaItem[]>([
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apartment-living-room-RBHwWHWbQoMHJDDeMJQQNbTKbFNBxM.jpg' },
    { type: 'image', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apartment-kitchen-OMHWdUwPqzXTIYXjHGgQfAzMsZcmxK.jpg' },
    { type: 'video', url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apartment-tour-zWqQMQwBDxLKwgsNBGQQtGGSNPNpxc.mp4', thumbnail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apartment-tour-thumbnail-OPDDHHHHHHNNBBBGGGQQtGGSNPNpxc.jpg' },
  ])

  const handleExtractInfo = () => {
    setExtractedInfo({
      businessName: 'Park Towne Place Apartments',
      phoneNumber: '814-646-3116',
      address: '2200 Benjamin Franklin Parkway, Philadelphia, PA 19130',
      applyNowLink: 'https://aimco.my.site.com/s/?PropertyId=043443&PrimaryTrafficSource=97454&AdSourcePhoneNumber=8146463116',
      viewPhotosLink: 'https://www.parktowneapthomes.com/en/apartments/Gallery.html',
      specialOffer: 'Receive two months free when you move into select apartment homes (conditions apply).',
      description: 'Luxury apartments in the Philadelphia Parkway Museum District. Walking distance to the Barnes Foundation and Philadelphia Museum of Art.',
      primaryColor: '#dc2626',
      heroImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apartment-exterior-RBHwWHWbQoMHJDDeMJQQNbTKbFNBxM.jpg',
      heroVideo: ''
    })

    setCorpus(`
Park Towne Place Apartments
Location: 2200 Benjamin Franklin Parkway, Philadelphia, PA 19130

Move-in Special:
Receive two months free when you move into select apartment homes (conditions apply).

Property Overview:
Luxury apartments in the Philadelphia Parkway Museum District. Walking distance to the Barnes Foundation and Philadelphia Museum of Art.
- Modern kitchens with quartz countertops and stainless steel appliances
- Wood plank flooring throughout
- Stackable washer and dryer
- Walk-in closets with custom built-in organization

Amenities:
- Largest swimming pool in the area with cabanas, wet bar, grills, and fire pit
- Fitness center with virtual fitness classes
- On-site wellness services including a salon and spa
- Dog-friendly with three large dog parks
- On-site market for fresh produce and snacks
- Community spaces for events and workshops
- Smart home technology

Residences Available:
- Studio apartments starting at $1,546 (425 sq ft)
- One-bedroom apartments starting at $1,957 (696 sq ft)
- Two-bedroom apartments starting at $2,599 (945 sq ft)
- Three-bedroom apartments starting at $3,516 (1123 sq ft)
- Penthouses available with various layouts and sizes

Community Features:
- 24-hour concierge
- Controlled access building
- On-site recycling and dry cleaning
- Package lockers
- Central great lawn and resident lounge

Pet Policy:
- Pet-friendly, allowing two pets per home
- Non-refundable pet fee of $250 and monthly pet rent of $50 per pet
- Breed restrictions apply

Parking Options:
- Standard parking starts at $260
- Garage parking starts at $315
- EV charging stations available

Lease Information:
- Lease terms of 10 to 24 months available
- Liability coverage required

Contact Information:
For more information or to schedule a tour, call 814-646-3116.

Reviews:
Residents have praised the community for its amenities, cleanliness, and friendly staff. Many highlight the convenient location and vibrant atmosphere.

Note: Apartment prices, availability, and terms are subject to change without notice.
    `)
  }

  const addMedia = () => {
    setMediaGallery([...mediaGallery, { type: 'image', url: '/placeholder.svg?height=100&width=100' }])
  }

  const removeMedia = (index: number) => {
    setMediaGallery(mediaGallery.filter((_, i) => i !== index))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-8 overflow-auto">
        <button className="flex items-center text-gray-600 mb-6">
          <ArrowLeft className="mr-2" />
          Go Back
        </button>
        
        <h1 className="text-3xl font-bold mb-6">Create Agent</h1>
        
        <div className="flex space-x-2 mb-6">
          <button className="px-4 py-2 bg-gray-200 rounded-full">Widget</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-full">AI Chat</button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Website</label>
            <div className="flex">
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="Enter your website URL to be trained on"
                className="flex-grow p-2 border rounded-l-md"
              />
              <button
                onClick={handleExtractInfo}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
              >
                Fetch Links
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                value={extractedInfo.businessName}
                onChange={(e) => setExtractedInfo({...extractedInfo, businessName: e.target.value})}
                placeholder="Enter your business name"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={extractedInfo.phoneNumber}
                onChange={(e) => setExtractedInfo({...extractedInfo, phoneNumber: e.target.value})}
                placeholder="Enter phone number"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <div className="relative">
                <input
                  type="text"
                  value={extractedInfo.address}
                  onChange={(e) => setExtractedInfo({...extractedInfo, address: e.target.value})}
                  placeholder="Enter address"
                  className="w-full p-2 pr-10 border rounded-md"
                />
                <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apply Now Link</label>
              <div className="relative">
                <input
                  type="url"
                  value={extractedInfo.applyNowLink}
                  onChange={(e) => setExtractedInfo({...extractedInfo, applyNowLink: e.target.value})}
                  placeholder="Enter apply now link"
                  className="w-full p-2 pr-10 border rounded-md"
                />
                <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">View Photos Link</label>
              <div className="relative">
                <input
                  type="url"
                  value={extractedInfo.viewPhotosLink}
                  onChange={(e) => setExtractedInfo({...extractedInfo, viewPhotosLink: e.target.value})}
                  placeholder="Enter view photos link"
                  className="w-full p-2 pr-10 border rounded-md"
                />
                <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Offer</label>
            <input
              type="text"
              value={extractedInfo.specialOffer}
              onChange={(e) => setExtractedInfo({...extractedInfo, specialOffer: e.target.value})}
              placeholder="Enter special offer"
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Corpus</label>
            <textarea
              value={corpus}
              onChange={(e) => setCorpus(e.target.value)}
              placeholder="Enter your corpus of information here..."
              className="w-full p-2 border rounded-md h-40 resize-vertical"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Media Gallery</label>
            <div className="flex flex-wrap gap-2">
              {mediaGallery.map((media, index) => (
                <div key={index} className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                    {media.type === 'image' ? (
                      <>
                        <ImageIcon className="absolute text-gray-400" size={32} />
                        <img src={media.url} alt={`Media ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                      </>
                    ) : (
                      <>
                        <Video className="absolute text-gray-400" size={32} />
                        <img src={media.thumbnail} alt={`Video ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => removeMedia(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                  {media.type === 'video' && (
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                      Video
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={addMedia}
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-400"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={gradientBorder}
                  onChange={() => setGradientBorder(!gradientBorder)}
                />
                <div className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${gradientBorder ? 'bg-red-400' : ''}`}></div>
                <div className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform ${gradientBorder ? 'transform translate-x-full' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">Gradient Border</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex space-x-2">
              {['#dc2626', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-8 h-8 p-0 border-0 rounded-full cursor-pointer"
              />
            </div>
          </div>
          
          <button className="w-full bg-red-500 text-white py-2 rounded-md mt-4">
            Create / Update
          </button>
        </div>
      </div>
      
      <div className="w-96 bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <div className={`w-80 mx-auto ${gradientBorder ? 'p-0.5 bg-gradient-to-r from-red-400 to-blue-500' : ''} rounded-lg overflow-hidden`}>
          <div className="w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-lg overflow-hidden shadow-xl">
            <div className="relative h-48 bg-cover bg-center" style={{backgroundImage: `url(${extractedInfo.heroImage || '/placeholder.svg?height=200&width=320'})`}}>
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-xl font-semibold mb-2">👋 Hello there</p>
                <p className="text-2xl font-bold">Welcome to {extractedInfo.businessName}</p>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <input
                  type="text"
                  placeholder="Ask us a question"
                  className="w-full bg-transparent placeholder-gray-400 focus:outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {['Tell me about the neighborhood?', 'What floor plans do you offer?', 'What amenities are included?', 'Tell me about your parking?'].map((question, index) => (
                  <button key={index} className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-2 text-left text-sm">
                    {question}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                {['Apply Now', 'View Special Offers', 'View Photos'].map((action, index) => (
                  <button key={index} className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full px-3 py-1 text-sm">
                    {action}
                  </button>
                ))}
              </div>
              
              <button className={`w-full bg-${selectedColor} hover:bg-opacity-90 text-white py-3 rounded-lg`}>
                Schedule a Tour
              </button>
              
              <button className="w-full flex items-center justify-center text-blue-400 hover:text-blue-300">
                <Play size={20} className="mr-2" />
                Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}