package com.tp.infWeb.Exo2.endpoints;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tp.infWeb.Exo2.dto.ReservationDTO;
import com.tp.infWeb.Exo2.dto.TauxDeRemplissageDTO;


@RestController
@RequestMapping("/administration")
public class Admin {

	@GetMapping
	public List<ReservationDTO> getAllReservations() {
		return null;
	}
	
	@GetMapping("/futuresReservations")
	public List<ReservationDTO> getAllFuturesReservations() {
		return null;
	}
	
	/**
	 * 
	 * @param moisDonne (0-12 inclus)
	 * @return
	 */
	@GetMapping("/remplissageHotels")
	public List<TauxDeRemplissageDTO> getRemplissageHotels(int moisDonne) {
		return null;
	}
	
}
