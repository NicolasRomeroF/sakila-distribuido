package dsistemasdistribuidos.controllers;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHits;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.boot.configurationprocessor.json.JSONStringer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;
import dsistemasdistribuidos.models.MovieIndex;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ComponentScan(basePackages="tbd.grupo1.femdat")
@RestController
@EnableAutoConfiguration
@RequestMapping("/elasticsearch")
public class ElasticSearchController {
    @Autowired
    private MovieIndex movieIndex;

    /*public ElasticSearchController(TweetIndex femdatIndex) {
        this.femdatIndex = femdatIndex;
    }*/

	@GetMapping("/{id}")
	public Map<String, Object> getTweetById(@PathVariable String id){
	  return null;
	}
}
