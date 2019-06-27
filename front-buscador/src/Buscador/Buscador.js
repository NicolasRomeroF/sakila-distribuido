import React from 'react';
import logo from '../yagoo.jpg';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap'

import './Buscador.css';

class Buscador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
      boton:false,
    };

  }

  handleChange = (event) => {
    var valor = event.target.value; 
    this.setState({busqueda: valor})
    if(valor.length>0){
      this.setState({boton: true})
    }
    else{
      this.setState({boton: false})
    }
    event.preventDefault();

  }

  handleSubmit = (event) => {
    if(event.key === 'Enter' && this.state.boton === true){
      this.props.history.push('/search/'+this.state.busqueda);
    }
    

  }

  render() {
    return (
      <div className="vertical-center">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <div className="busqueda-input">
              <div className="container">
              
                <InputGroup className="mb-3">
                  <FormControl
                    aria-label="busqueda"
                    aria-describedby="basic-addon2"
                    value={this.state.busqueda}
                    onChange={this.handleChange}
                    onKeyDown={this.handleSubmit}
                  />
                  <InputGroup.Append>
                  {
                    this.state.boton ? (<LinkContainer to={{
                      pathname: "/search/"+this.state.busqueda
                    }}>
                      <Button disabled={!this.state.boton}>Buscar</Button>
                    </LinkContainer>):<Button disabled ={!this.state.boton}>Buscar</Button>
                  }
                
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </div>
        </header>
      </div>
    );
  }
}

export default Buscador;
