
import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { GlobalContext } from '../../screens/context/context'

import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { width } from '@mui/system';
import {
    auth, doc, db, collection, addDoc,
    setDoc, ref, storage, uploadBytes, getDownloadURL


} from '../../config/firebase'

const Input = styled('input')({
    display: 'none',
});

export default function AddDish() {
    const { state, dispatch } = useContext(GlobalContext);
    let [itemName, setitemName] = useState('')
    let [itemprice, setitemprice] = useState('')
    let [imgobj, setimgobj] = useState({})
    let [localimg,setlocalimg]=useState('')


    let [category, setcategory] = useState(["Chinese", "Pakistani"])
    let [selectCat, setselectCat] = useState('Pakistani')
    let [DeliveryType, setDeliveryType] = useState('paid')

    const getimageurl = async () => {
        if (state.authUser) {

            const refernce = ref(storage, `dishes/${state.authUser.userid}/${selectCat}/${new Date()}/${imgobj.name}`);
            console.log(refernce);


            let imgfile = await uploadBytes(refernce, imgobj)

            let imgurl = await getDownloadURL(refernce)
            return imgurl
        }

        console.log(imgobj);

    }
    const addDishItem = async () => {
        if (itemName != '' && itemprice != '' && imgobj != {}) {
            const urlimage = await getimageurl()
            console.log(urlimage);
            let itemadd = {
                DishName: itemName,
                Price: itemprice,
                Category: selectCat,
                DeliverType: DeliveryType,
                RestaurantOwnerId: state.authUser.userid,
                DishImage: urlimage
            }
            //  const docRef = await addDoc(collection(db, "cities"), {
            //     name: "Tokyo",
            //     country: "Japan"
            //   });
            const dataRef = collection(db, "Dishes")
            await addDoc(dataRef, itemadd)

            alert("Dish Added Successfully!")
            setimgobj({})
            setlocalimg('')


        }
        else {
            console.log("*********");
        }


        


        //  console.log(itemadd);
    }
    return (
        <>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center', width: "60%", margin: "0 auto" }}>
                <h3 style={{textAlign:'center'}}>Add Image</h3>
                <label htmlFor="icon-button-file">
                    
                    <Input onChange={(eve) => { 
                    setimgobj(eve.target.files[0])
                    setlocalimg(eve.target.value)
                    
                    }} accept="image/*" id="icon-button-file" type="file" />
                    <IconButton style={{ width: "100px", height: "100px" }} color="primary" aria-label="upload picture" component="span">
                        {localimg != '' ? (
                        <img src={localimg}/>
                            
                            ) :
                            (<PhotoCamera />)

                        }


                    </IconButton>
                </label>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Item Name"
                            multiline
                            maxRows={4}
                            onBlur={(eve) => { setitemName(eve.target.value) }}


                        />

                        <TextField
                            id="outlined-number"
                            label="Price"
                            type="number"
                            onBlur={(eve) => { setitemprice(eve.target.value) }}
                        />



                    </div>
                    <div>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

                    </div>
                </Box>



                <Box sx={{ minWidth: 50 }}>
                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select 
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectCat}
                            label="Category"
                            placeholder="Category"
                            onChange={(eve) => { setselectCat(eve.target.value) }}

                        >
                            {
                                category.map((dishCat) =>
                                    <MenuItem value={dishCat}>{dishCat}</MenuItem>
                                )
                            }


                        </Select>


                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id="demo-simple-select-label">Delivery Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={DeliveryType}
                            label="Delivery Type"
                            placeholder="Delivery Type"
                            onChange={(eve) => { setDeliveryType(eve.target.value) }}


                        >
                            <MenuItem value="free">Free</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>

                        </Select>


                    </FormControl>
                </Box>
                <Button variant="contained"
                    onClick={addDishItem}


                >Add Dish</Button>
            </div>
        </>
    )

}