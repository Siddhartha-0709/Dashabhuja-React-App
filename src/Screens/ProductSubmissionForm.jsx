/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Upload, Mail, DollarSign, Tag, Loader2, ImageIcon, Sparkles } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import commerce from '../assets/commerce.png'
// Initialize Google Generative AI with an empty API key for demonstration
// In a real application, use environment variables to securely store API keys
const genAI = new GoogleGenerativeAI('AIzaSyAHCmjlGUMpbBn8R9w-lH8UxZEXXCLzMBc')

const categories = [
    'Food',
    'Jewellery',
    'Embroidery',
    'Cosmetics',
    'Accessories',
    'Clothing',
    'Furniture',
    'Home Decor',
    'Other',
]

export default function ProductSubmissionForm() {
    const [formData, setFormData] = useState({
        productName: '',
        sellerEmail: '',
        price: '',
        category: '',
        image: null, // File | null
    })
    const [loading, setLoading] = useState(false)
    const [generatingDescription, setGeneratingDescription] = useState(false)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [aiDescription, setAiDescription] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
            }))
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleGenerateDescription = async () => {
        if (!formData.image || !formData.productName) {
            alert('Please provide both product name and image to generate description')
            return
        }

        setGeneratingDescription(true)
        try {
            const imageFile = formData.image
            const reader = new FileReader()

            reader.onloadend = async () => {
                const imageBase64 = (reader.result).split(',')[1]
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
                const prompt = `Generate a short product description for an e-commerce listing with the title: "${formData.productName}" and category: "${formData.category}". The description should be in plain text format.`

                const result = await model.generateContent([
                    prompt,
                    {
                        inlineData: {
                            data: imageBase64,
                            mimeType: 'image/jpeg',
                        },
                    },
                ])

                const description = result.response.text()
                setAiDescription(description)
            }

            reader.readAsDataURL(imageFile)
        } catch (error) {
            console.error('Error generating AI description:', error)
            alert('Failed to generate AI description. Please try again.')
        } finally {
            setGeneratingDescription(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const submitData = new FormData()
            submitData.append('name', formData.productName)
            submitData.append('sellerEmail', formData.sellerEmail)
            submitData.append('price', formData.price)
            submitData.append('category', formData.category)
            if (formData.image) {
                submitData.append('image', formData.image)
            }
            submitData.append('description', aiDescription)

            const response = await fetch('https://siddharthapro.in/app4/api/v1/commerce/create-product', {
                method: 'POST',
                body: submitData,
            })

            if (!response.ok) {
                throw new Error('Failed to submit product')
            }

            const data = await response.json()
            console.log(data)
            alert('Product submitted successfully!')
            resetForm()
        } catch (error) {
            console.error('Error submitting product:', error)
            alert('Failed to submit product. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            productName: '',
            sellerEmail: '',
            price: '',
            category: '',
            image: null,
        })
        setPreviewUrl(null)
        setAiDescription('')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
                <div className="flex flex-col items-center justify-center text-center">
                    <img src={commerce} alt="Commerce" className="w-full mb-6" />
                </div>

                <div className="max-w-full md:max-w-2xl p-6 bg-white rounded-lg shadow-lg mb-24 md:mb-0">
                    <h2
                        className="text-2xl font-bold mb-6 text-gray-800"
                        style={{ fontFamily: 'Ubuntu', fontWeight: '700' }}
                    >
                        Add New Product
                    </h2>
                    <p
                        className="text-gray-600 mb-6"
                        style={{ fontFamily: 'Ubuntu', fontWeight: '300' }}
                    >
                        At Dashabhuja, we celebrate and empower women entrepreneurs by providing a platform to showcase your unique products. Join our community of inspiring women-led businesses and reach a wider audience. Let's work together to make your business flourish and inspire others with your success story!
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            label="Product Name"
                            icon={<Tag className="w-4 h-4" />}
                            name="productName"
                            type="text"
                            value={formData.productName}
                            onChange={handleInputChange}
                            required
                        />

                        <FormField
                            label="Seller Email"
                            icon={<Mail className="w-4 h-4" />}
                            name="sellerEmail"
                            type="email"
                            value={formData.sellerEmail}
                            onChange={handleInputChange}
                            required
                        />

                        <FormField
                            label="Price"
                            icon={<DollarSign className="w-4 h-4" />}
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.01"
                        />

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                <Tag className="inline-block w-4 h-4 mr-2" />
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <ImageIcon className="inline-block w-4 h-4 mr-2" />
                                Product Image
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                required
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                            {previewUrl && (
                                <div className="mt-4">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{ maxWidth: '200px', borderRadius: '8px' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    <Sparkles className="inline-block w-4 h-4 mr-2" />
                                    Product Description
                                </label>
                                <button
                                    type="button"
                                    onClick={handleGenerateDescription}
                                    disabled={generatingDescription || !formData.image || !formData.productName}
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 disabled:cursor-not-allowed"
                                >
                                    {generatingDescription ? (
                                        <>
                                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Generate AI Description
                                        </>
                                    )}
                                </button>
                            </div>
                            <textarea
                                id="description"
                                name="description"
                                value={aiDescription}
                                onChange={(e) => setAiDescription(e.target.value)}
                                rows="4"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                            ) : (
                                'Submit Product'
                            )}
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

function FormField({ label, icon, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {icon} {label}
            </label>
            <input
                {...props}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    )
}
