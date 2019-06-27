package dsistemasdistribuidos.demo.service;


import dsistemasdistribuidos.demo.dao.FilmDAO;
import dsistemasdistribuidos.demo.model.Film;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Service
@RestController
@RequestMapping(value = "/film")
public class FilmService {

    @Autowired
    private final FilmDAO filmdao;

    public FilmService(FilmDAO filmdao) {
        this.filmdao = filmdao;
    }

    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public Film getFilmbyID(@PathVariable int id){
        return this.filmdao.findByIdFilm(id);
    }
}
