package dsistemasdistribuidos.demo.model;

import lombok.Data;

import javax.persistence.*;


@Entity
@Data
@Table(name = "film")
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name="film_id",
            unique=true,
            nullable=false
    )
    private int idFilm;

    @Column(name="title")
    private String title;

    @Column(
            name="description",
            length=65535,
            columnDefinition = "text"
    )
    private String description;

}
