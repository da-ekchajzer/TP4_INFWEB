package com.tp.infWeb.Exo2.dto;

import java.time.LocalDate;

public class ReservationDTO {
	
	private int id;
	private int nbPersonnes;
	private int idChambre;
	private int idHotel;
	private LocalDate dateArrivee;
	private LocalDate dateDepart;
	
	public ReservationDTO(int id, int nbPersonnes, int idChambre, int idHotel, LocalDate dateArrivee,
			LocalDate dateDepart) {
		this.id = id;
		this.nbPersonnes = nbPersonnes;
		this.idChambre = idChambre;
		this.idHotel = idHotel;
		this.dateArrivee = dateArrivee;
		this.dateDepart = dateDepart;
	}

	public int getId() {
		return id;
	}

	public int getNbPersonnes() {
		return nbPersonnes;
	}

	public void setNbPersonnes(int nbPersonnes) {
		this.nbPersonnes = nbPersonnes;
	}

	public int getIdChambre() {
		return idChambre;
	}

	public void setIdChambre(int idChambre) {
		this.idChambre = idChambre;
	}

	public int getIdHotel() {
		return idHotel;
	}

	public void setIdHotel(int idHotel) {
		this.idHotel = idHotel;
	}

	public LocalDate getDateArrivee() {
		return dateArrivee;
	}

	public void setDateArrivee(LocalDate dateArrivee) {
		this.dateArrivee = dateArrivee;
	}

	public LocalDate getDateDepart() {
		return dateDepart;
	}

	public void setDateDepart(LocalDate dateDepart) {
		this.dateDepart = dateDepart;
	} 
	
	
	
	
}
