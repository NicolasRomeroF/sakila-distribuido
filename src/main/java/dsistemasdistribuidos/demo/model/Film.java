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

    @Column(name="release_year")
    private int release_year;


    @Column(name="language_id")
    private int language_id;

    @Column(name="original_language_id")
    private int original_language_id;

    @Column(name="rental_duration")
    private int rental_duration;

    @Column(name="rental_rate")
    private int rental_rate;

    @Column(name="length")
    private int length;

    @Column(name="lengthreplacement_cost")
    private int lengthreplacement_cost;

}
