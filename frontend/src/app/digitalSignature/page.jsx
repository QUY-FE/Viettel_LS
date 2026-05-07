import Breadcrumb from '#/components/ui/Breadcrumb'
import React from 'react'

const breadcrumbItems = [
  { label: "Chữ ký số", href: "/digitalSignature" },
]

const page = () => {
  return (
    <div className='max-w-7xl mx-auto min-h-screen px-2 lg:px-4'>
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="my-4 font-bold text-3xl text-center">
        Chữ ký số
        <span className="font-magistral text-primary"> Viettel</span>
      </h1>


      digital signature
    </div>
  )
}

export default page
