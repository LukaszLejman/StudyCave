package studycave.application.files;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class MaterialDTO {
	private String title;
	private String owner;
	private String permission;
	@JsonIgnore
    private Date addDate;
	@JsonIgnore
    private Date editDate;
    private int grade;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
	public Date getAddDate() {
		return addDate;
	}
	public void setAddDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.addDate = sqlDate;
	}
	public Date getEditDate() {
		return editDate;
	}
	public void setEditDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.editDate = sqlDate;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	
}
