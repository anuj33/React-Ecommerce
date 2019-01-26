import React,{Component} from 'react';
import * as constant from './constant'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Category.css';
class TopCategories extends Component{
    state={
        topCategories:{ },
        statusCode:null
    }

    componentDidMount(){
        axios.get(constant.ms1+'/displayByTopScore')
            .then(res =>{
                console.log(res);
                if((res.data.statusCode)===200){
                    this.setState({
                        topCategories:res.data.responseData
                    })    
                }
                else{
                    alert(res.data.message);
                }
            })
    }

    render(){
    const {topCategories}=this.state;
    console.log(topCategories)
    const topCategoriesList = topCategories.length ?(
            topCategories.map(category =>{
                return(
                    <div className="category card" key={category.categoryId}>
                        <Link to={'/categories/'+category.categoryId+'/products'}>
                        <div className="card-content">  
                            <span className="card-name">Category Name: {category.categoryName}</span>
                            <p>Description: {category.desc}</p>
                        </div>
                         <img className="card-image" src={category.picURL} alt=""/> }
                        </Link>
                    </div>
                )
            })
    ):(
        <div className="center">
            No Categories To Show
        </div>
    )
    return(
            <div className="container" >
            <h4 className="center">Top Categories</h4>
            {topCategoriesList}            
            </div>  
    )}
}

export default TopCategories;