import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products,setProducts]=useState([])

    const getAllProducts=async()=>{
        try{
            const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            setProducts(data.products)
        }catch(error){
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    useEffect(()=>{
        getAllProducts();
    },[])
  return (
    <Layout title={"Admin-Dashboard Products Ecom-App"}>
        <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>All products list</h1>
                <div className='d-flex flex-wrap'>
                {products?.map((p)=>(
                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                        <div className="card m-2" style={{width: '15rem'}} >
                        
                    <img className="card-img-top" style={{ height: "300px"}} src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name}/>
                    
                    <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                    </div>
                    </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Products