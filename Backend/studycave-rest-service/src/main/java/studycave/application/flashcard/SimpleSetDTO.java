package studycave.application.flashcard;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SimpleSetDTO {

    private Long id;
    private String name;
    private String category;
	@JsonProperty("owner")
    private String owner;
	@JsonProperty("add_date")
    private Date addDate;
	@JsonProperty("edit_date")
    private Date editDate;
    private int grade;
    private String permission;
    
    protected SimpleSetDTO() {}

	public SimpleSetDTO(String name, String category, String owner) {
		super();
		this.name = name;
		this.category = category;
		this.owner = owner;
	}
	
	public SimpleSetDTO(Set set) {
		super();
		this.name = set.getName();
		this.category = set.getCategory();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}


	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}
	
}
