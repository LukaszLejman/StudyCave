package studycave.application.groups;

import java.util.Date;

public class ContentDto {
	private Long id;
	private String title;
	private String addDate;
	private String owner;
	private Long grade;
	
	public ContentDto(){
		
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
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
	public String getAddDate() {
		return addDate;
	}

	public void setAddDate(String string) {
		this.addDate = string;
	}

	public Long getGrade() {
		return grade;
	}
	public void setGrade(Long grade) {
		this.grade = grade;
	}
	

}
