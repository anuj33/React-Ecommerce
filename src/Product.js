import React, { Component } from 'react';
import axios from 'axios';
import * as constant from './constant'
import {withRouter} from 'react-router-dom';

class Product extends Component {
    state = {
        CategoryName: "",
        product: {},
        responseData:null,
        Product : {
            "productId": "",
            "productName": "",
            "price": null,
            "imageUrl": "",
            "quantity": null,
            "brand":""
        },

    }

    handleClick=(product)=>{
        this.setState({
            Product:{
                "productId": product.productId,
                "productName": product.productName,
                "price": product.price,
                "imageUrl":"url",
                "quantity": product.quantity,   
                "brand": product.brand
            },
            message:""
        },()=>{
            this.handleAddToCart(product)});
        }
    handleAddToCart=(product)=>{
        console.log(this.state.Product)
        axios.post(constant.ms2+'/cart/addToCart',
            this.state.Product,
        {'Content-Type':'application/json'}).then(response => {
            console.log(response)
            if(response.data.statusCode===200){
                this.setState({
                    message:response.data.message
                })

            }else{
                console.log(response.data.statusCode)
                alert(response.data.message)
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
       
    handleBuyNow=(product)=>{
        console.log("Buying"    );
        this.setState({
            Product:{
                "productId": product.productId,
                "productName": product.productName,
                "price": product.price,
                "imageUrl":"url",
                "quantity": product.quantity,
                "brand":product.brand
            }
        },() => {
            axios.post(constant.ms2+'/cart/buy',this.state.Product,
            {'Content-Type':'application/json'})
            .then((response) => {
                this.setState({
                    responseData:response.data.responseData
                })
                console.log(response.data.responseData)
                this.props.history.push({
                        pathname: "/checkout",
                        state:{
                            responseData:response.data.responseData
                        }
                    })
                }).catch((error)=>{
                console.log(error);
            }
            )}
        )
    }
    componentDidMount() {
        let productId = this.props.match.params.productId;
        axios.get(constant.ms1+'/products/' + productId)
            .then(res => {
                // console.log(res.data);
                if(res.data.statusCode===200){
                    this.setState({
                        product: res.data.responseData[0],
                    })
                }
                else{
                    alert(res.data.message)
                }
            })
            .catch(error=> {
                console.log(error);
            });
    }
    render() {
        const product = this.state.product;
        let keys=[];
        let products1=product.genFeatures;
            for(let key in products1)
            {
                keys.push(key)
            }
        let keys2=[];
        let products2=product.prodSpecs;
            for(let key in products2)
            {
                keys2.push(key)
            }
    
            const items = []

            for (const [index, value] of keys.entries()) {
                items.push(<li key={index}>{value} : {products1[value]}</li>)
            }
            const items2 = []

            for (const [index, value] of keys2.entries()) {
                items2.push(<li key={index}>{value} : {products2[value]}</li>)
            }
        
        // console.log(product.genFeatures)
        return (
            <div className="products container">
                <hr/>
                    <div className="row center message">{this.state.message}</div>
                        <div className="row">
                            <div className="col s6">
                                <div className="row">
                                    <div className="collection-item col s6">Name:</div>
                                    <div className="collection-item col s6">{product.productName}</div>
                                </div>    
                                <div className="row">
                                    <div className="collection-item col s6">Price:</div>
                                    <div className="collection-item col s6">Rs.{product.price}</div>
                                </div>                   
                                <div className="row">                                            
                                    <div className="collection-item col s3">General Features:</div>                    
                                    <div className="collection-item col s6">{items2}</div>
                                </div>                        
                                <div className="row">
                                    &nbsp;
                                    <button className="waves-effect waves-light btn-small" onClick={()=>{this.handleBuyNow(product)}}>
                                        <i className="material-icons">book</i>
                                        Buy Now</button>
                                    &nbsp;
                                </div>
                            </div>
                            <div className="col s6">
                                <div className="row">
                                    <div className="collection-item col s6">Brand:</div>
                                    <div className="collection-item col s6">{product.brand}</div>
                                </div>
                                <div className="row">
                                    <div className="collection-item col s6">Product Description:</div>
                                    <div className="collection-item col s6">{product.desc}</div>
                                </div>
                                <div className="row">
                                    <div className="collection-item col s3">Product Features:</div>
                                    <div className="collection-item col s6">{items}</div>
                                </div>
                                <div className="row">                    
                                    <button className="waves-effect waves-light btn-small" onClick={()=>{this.handleClick(product)}}>
                                        <i className="material-icons">add_shopping_cart</i>Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
    }
}
export default withRouter(Product);