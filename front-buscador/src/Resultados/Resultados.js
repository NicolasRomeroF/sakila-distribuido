
import React from 'react';
import logo from '../yagoo.jpg';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios';

import './Resultados.css';


const prueba=[
  {id: 1, titulo:"Men in Black", descripcion: "dhfsdfsdf sfsdfsdf sdfsdf sdfsdfsdfsdfksdhgfhjsdfsd sdfsdjfhsdkfjhsdkfjsdf sdjfhsdkfjsdkfhjsdgfkhsdgfksdf sdfjsdghfksdghfksdhgfsdkf"},
  {id: 2, titulo:"Tostori 4", descripcion: "juguetes en problemas"}
]

class Resultados extends React.Component {
  constructor(props) {
    super(props);
    const params = props.match.params;

    var test = {id:3, titulo: params.cadena, descripcion: params.cadena};

    this.state = {
      busqueda: this.props.match.params.cadena,
      resultados:  [...prueba,test],
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
      console.log(this.params);
    }
      
  }

  componentWillReceiveProps(nextProps) {
    this.params = nextProps.params;
    this.query(nextProps)
  }

  query(props){
    const params = props.match.params;
    var test = {id:3, titulo: params.cadena, descripcion: params.cadena};
    this.setState({resultados: [...prueba,test]})
  }

  handleSubmit2 = (event) => {
    alert('Se hace la busqueda: ' + this.state.busqueda);
    const search = {
      busqueda: this.state.busqueda
    };
    var authOptions = {
      method: 'POST',
      url: 'search',
      data: search,
      headers: {
          'Content-Type': 'application/json'
      },
    };
    axios(authOptions)
      .then(function(response){
        console.log(response.data);
        console.log(response.status);
      })
      .catch(function(error){
        console.log(error);
    });

    event.preventDefault();
  }

  buildResultados = () => {
    return this.state.resultados.map((resultado) => {
      return(
        <Resultado key={resultado.id} titulo={resultado.titulo} descripcion={resultado.descripcion}/>
      )
})
  }

  render() {
    return (
      <div>
        <div className="search-bar">
            
            <Row>
                <Col md={1} xs={12}>
                    <div className="center">
                    <LinkContainer to="/">
                      <img src={logo} className="logo-bar" alt="logo" />
                    </LinkContainer>
                    </div>
                </Col>
                <Col md={5} xs={12}><InputGroup>
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
                </Col>
            </Row>
          </div>
          <hr className="hr-divider"/>
            {this.buildResultados()}
            

      </div>
      
    );
  }
}

function Resultado(props) {
  return (
    <div>          
      <Row>
        <Col md={1} xs={12}></Col>
    
          <Col md={5} xs={12}>
            <h3>{props.titulo}</h3>
            <p>{props.descripcion}</p><br/>
          </Col>
      

      </Row>
    </div>
  );
}

export default Resultados;
