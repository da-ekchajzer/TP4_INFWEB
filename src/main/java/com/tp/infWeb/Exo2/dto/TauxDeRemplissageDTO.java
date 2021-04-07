package com.tp.infWeb.Exo2.dto;

public class TauxDeRemplissageDTO {

	private int idHotel;
	private int mois;
	private float tauxDeRemplissage;
	
	public TauxDeRemplissageDTO(int idHotel, int mois, float tauxDeRemplissage) {
		this.idHotel = idHotel;
		this.mois = mois;
		this.tauxDeRemplissage = tauxDeRemplissage;
	}
	
	public int getIdHotel() {
		return idHotel;
	}
	public int getMois() {
		return mois;
	}
	public float getTauxDeRemplissage() {
		return tauxDeRemplissage;
	}
	
}
