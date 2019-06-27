package dsistemasdistribuidos.demo.dao;

import dsistemasdistribuidos.demo.model.Film;
import org.springframework.data.jpa.repository.JpaRepository;



public interface FilmDAO extends JpaRepository<Film, Long>{

    Film findByIdFilm(int id);

}
