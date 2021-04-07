package com.tp.infWeb.Exo2.endpoints;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tp.infWeb.Exo2.dto.ReservationDTO;

@RestController
@RequestMapping("/reservations")
public class Client {

	@PostMapping("/reserver")
	public boolean reserverChambre(int idChambre, LocalDate dateArrivee, LocalDate departDepart, int nbPers) {
		return true;
	}
	
	@DeleteMapping("/annuler")
	public boolean annulerReservation(int idResa) {
		return true;
	}
	
	@GetMapping("/suggestions")
	public List<ReservationDTO> getSuggestionsReservations(LocalDate dateArrivee) {
		return null;
	}
	
	
	
	
}
