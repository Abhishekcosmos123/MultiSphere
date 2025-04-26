"use client"

import type React from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export interface ProductField {
  name: string
  label: string
  placeholder: string
  type: "text" | "number" | "date" | "url"
  validation: (value: string) => string | null
}

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onAddProduct: (product: FormData) => void
  productDetailsFields: ProductField[]
  productInformation: ProductField[]
}

export function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
  productDetailsFields,
  productInformation,
}: AddProductModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [formValues, setFormValues] = useState<{ [key: string]: string | number }>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showCardDetails, setShowCardDetails] = useState(true)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const fields = productInformation

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    const allFields = [...fields, ...productDetailsFields]

    allFields.forEach((field) => {
      const value = formValues[field.name] as string
      if (!value || value.trim() === "") {
        newErrors[field.name] = `${field.label} is required`
      } else {
        const error = field.validation?.(value)
        if (error) newErrors[field.name] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (name: string, value: string | number) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const formData = new FormData()
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value.toString())
      }
    })
    if (imageFile) {
      formData.append("image", imageFile)
    }

    onAddProduct(formData)
    setFormValues({})
    setImageFile(null)
    setImagePreview(null)
    setErrors({})
    onClose()
  }

  useEffect(() => {
    validate()
  }, [formValues])

  const isFormValid =
    Object.values(errors).length === 0 &&
    [...fields, ...productDetailsFields].every((field) => formValues[field.name])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
      <div
        className={cn(
          "bg-white/95 dark:bg-gray-900/95 p-0 rounded-2xl shadow-2xl w-full relative",
          "transition-all transform duration-300 ease-out",
          "animate-in zoom-in-95 duration-300",
          "border border-gray-200/20 dark:border-gray-700/20",
          "backdrop-blur-xl",
          "flex flex-col",
          isMobile ? "mx-4 max-h-[90vh]" : "max-w-2xl max-h-[85vh]"
        )}
      >
        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            Add New Product
          </h3>
        </div>

        <div className="overflow-y-auto px-6 md:px-8 py-6 space-y-6 flex-1">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Product Information Card */}
            <div className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
              <div
                className={cn(
                  "flex items-center justify-between cursor-pointer p-4 transition-all",
                  "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                  showCardDetails && "border-b border-gray-200 dark:border-gray-700",
                )}
                onClick={() => setShowCardDetails(!showCardDetails)}
              >
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Product Information</h4>
                {showCardDetails ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
                )}
              </div>

              {showCardDetails && (
                <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top duration-200">
                  {/* Image Upload */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Product Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-300 rounded-lg cursor-pointer bg-white dark:bg-gray-800 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="mt-4 h-32 w-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    )}
                  </div>

                  {fields.map((field) => (
                    <div key={field.name} className="group">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                      >
                        {field.label}
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formValues[field.name] ?? ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={cn(
                          "transition-all duration-200",
                          "hover:border-gray-400 dark:hover:border-gray-500",
                          "focus:ring-2 focus:ring-offset-0",
                          errors[field.name]
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-gray-200 dark:border-gray-700",
                        )}
                      />
                      {errors[field.name] && (
                        <p className="text-sm text-red-500 mt-1.5 animate-in fade-in slide-in-from-top duration-200">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Card */}
            <div className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
              <div
                className={cn(
                  "flex items-center justify-between cursor-pointer p-4 transition-all",
                  "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                  showProductDetails && "border-b border-gray-200 dark:border-gray-700",
                )}
                onClick={() => setShowProductDetails(!showProductDetails)}
              >
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Product Details</h4>
                {showProductDetails ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
                )}
              </div>

              {showProductDetails && (
                <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top duration-200">
                  {productDetailsFields.map((field) => (
                    <div key={field.name} className="group">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                      >
                        {field.label}
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formValues[field.name] ?? ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={cn(
                          "transition-all duration-200",
                          "hover:border-gray-400 dark:hover:border-gray-500",
                          "focus:ring-2 focus:ring-offset-0",
                          errors[field.name]
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-gray-200 dark:border-gray-700",
                        )}
                      />
                      {errors[field.name] && (
                        <p className="text-sm text-red-500 mt-1.5 animate-in fade-in slide-in-from-top duration-200">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={!isFormValid}
                className={cn(
                  "bg-indigo-600 hover:bg-indigo-700 text-white",
                  "px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl",
                  "transition-all duration-200 transform hover:-translate-y-0.5",
                  "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                  !isFormValid && "opacity-50 cursor-not-allowed"
                )}
              >
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
