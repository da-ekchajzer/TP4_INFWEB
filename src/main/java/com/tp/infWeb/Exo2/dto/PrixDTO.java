package com.tp.infWeb.Exo2.dto;

public class PrixDTO {
	
	private String devise;
	private float montant;
	
	public PrixDTO(String devise, float montant) {
		this.devise = devise;
		this.montant = montant;
	}
	
	public String getDevise() {
		return devise;
	}
	public void setDevise(String devise) {
		this.devise = devise;
	}
	public float getMontant() {
		return montant;
	}
	public void setMontant(float montant) {
		this.montant = montant;
	}
	
	
	
}
