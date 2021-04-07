package com.tp.infWeb.Exo2.endpoints;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tp.infWeb.Exo2.dto.PrixDTO;

@RestController
@RequestMapping("/comptabilite")
public class Compta {

	@GetMapping("/CaPrevisionnel")
	public PrixDTO getCaPrevisionnel(int mois) {
		return null;
	}
	
	@GetMapping("/CaTotal")
	public PrixDTO getCaTotal() {
		return null;
	}
	
}
