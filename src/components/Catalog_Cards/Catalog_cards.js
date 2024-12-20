import React, { useState } from 'react';
import './Catalog_cards.css';
import data from '../../data/products.json'
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Catalog_cards = ({ addToBasket, removeFromBasket, BasketItems, searchValue, setFilterType, filterType }) => {
    const isInBasket = (id) => BasketItems.some(item => item.id === id);
    const filteredItemsOnTitle = data.filter(item =>
        item.title.toLowerCase().includes(searchValue?.toLowerCase() || ''));

    const filteredItemsOnType = filterType
    ? filteredItemsOnTitle.filter(item => item.type === filterType)
    : filteredItemsOnTitle;

    return (
        <div className="wrapper">
            <div className = "filter_product_category">
                <FormControl>
                    <FormLabel>Категории</FormLabel>
                    <RadioGroup
                        defaultValue=""
                        name="products_group"
                        onChange={setFilterType}
                    >
                        <FormControlLabel value="" control={<Radio />} label="Все" />
                        <FormControlLabel value="burger" control={<Radio />} label="Бургеры" />
                        <FormControlLabel value="pizza" control={<Radio />} label="Пиццы" />
                        <FormControlLabel value="drink" control={<Radio />} label="Напитки" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="cards">
                {filteredItemsOnType.map(item => (
                    <div key={item.id} className="card">
                        <div className="card_top">
                            <a className="card_image">
                                <img src={require(`../../images/${item.img}`)} alt={`Card ${item.id}`} />
                            </a>
                        </div>
                        <div className="card_bottom">
                            <div className="card_prices">
                                <div className="card_price card_price--common"><span className="text_price">Цена</span>{item.price}</div>
                            </div>
                            <a className="card_title">{item.title}</a>
                            <Button variant="outlined" color='primary.contrastText' sx={{ padding: '10px 20px', margin: '0', marginTop: 'auto' }} onClick={() => {
                                isInBasket(item.id) ? removeFromBasket(item.id) : addToBasket(item);
                            }}
                            >
                                {isInBasket(item.id) ? 'Удалить из корзины' : 'В корзину'}</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Catalog_cards;
