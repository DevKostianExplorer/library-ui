import { FilterProps } from "./Filter.props";
import styles from './Filter.module.css';
import cn from 'classnames';
import { Container, Row, Col } from "react-grid-system";
import { SetStateAction, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import React from 'react';
import chroma from 'chroma-js';


import Select, { MultiValue, StylesConfig } from 'react-select';
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { useSelector } from "react-redux";
import { Form, FormText } from "react-bootstrap";
import { RootState } from "../../store/store";
import { attributesAPI } from "../../services/BookAttributesService";
import { IGenre } from "../../store/models/IGenre";
import { IAuthor } from "../../store/models/IAuthor";






type Inputs = {};

export interface GenreOption extends IGenre{}

export interface AuthorOption extends IAuthor {}



const customStyles: StylesConfig<GenreOption, true> = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black'
    }),
    control: (provided, state) => ({
        ...provided,

        '&:hover': {
            borderColor: 'black',
        }
    }),
};

export const Filter = ({className, ...props}: FilterProps) => {
  const {data: genres} = attributesAPI.useFetchGenresQuery();
  const {data: authors} = attributesAPI.useFetchAuthorsQuery();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const [selectedOptions, setSelectedOptions] = useState<MultiValue<GenreOption>>([]);

  const handleChange = (options:MultiValue<GenreOption>) => {
    setSelectedOptions(options);
  };

  const onSubmit = (formData: any, event: any) => {    
    console.log("Form Data: ", formData)
    console.log("Selected Options: ", selectedOptions) //array with selected options
 }

return(
    <div className= {cn(styles.navbar, className)} {...props}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.filter}>
          <Form.Group className="mb-3" controlId="formBasicLogin">
                      <Form.Label>Search</Form.Label>
                      <Form.Control type="text" placeholder="Enter search" />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Genre:</Form.Label>
                    <Select
                closeMenuOnSelect={false}
                defaultValue={[]}
                isMulti
                options={genres}
                getOptionValue={(option: GenreOption) => option.id.toString()}
                getOptionLabel={(option: GenreOption) => option.name}
                // styles={customStyles}
                onChange = {handleChange}
            />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Author:</Form.Label>
                    <Select
                closeMenuOnSelect={false}
                defaultValue={[]}
                isMulti
                options={authors}
                getOptionValue={(option: AuthorOption) => option.id.toString()}
                getOptionLabel={(option: AuthorOption) => option.name}
                // styles={customStyles}
                onChange = {handleChange}
            />
                    </Form.Group>
            
            
            
          </div>
            <SubmitButton value= "Search" />
        </form>
    </div>
)
}