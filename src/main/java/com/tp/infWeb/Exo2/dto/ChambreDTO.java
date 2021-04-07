package com.tp.infWeb.Exo2.dto;

public class ChambreDTO {
	
	private int id;
	private float prixParNuit;
	private int nbPlaces;
	
	public ChambreDTO(int id, float prixParNuit, int nbPlaces) {
		this.id = id;
		this.prixParNuit = prixParNuit;
		this.nbPlaces = nbPlaces;
	}
	
	public int getId() {
		return id;
	}
	public float getPrixParNuit() {
		return prixParNuit;
	}
	public int getNbPlaces() {
		return nbPlaces;
	}
	
	
	
}
