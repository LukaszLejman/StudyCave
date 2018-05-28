package studycave.application.test;

import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;

public class TestCreateDTO {

    private String title;
    private String owner;
    @JsonIgnore
    private long idOwner;
    //@JsonIgnore
    @JsonProperty("add_date")
    private Date addDate;
    //@JsonIgnore
    @JsonProperty("edit_date")
    private Date editDate;
    @ApiModelProperty(value = "Default value for note", required = true,example = "public") 
    private String permission;
    @JsonProperty("body")
    List<QuestionCreateDTO> questions;
    
    protected TestCreateDTO() {
    	
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

	public long getIdOwner() {
		return idOwner;
	}

	public void setIdOwner(long idOwner) {
		this.idOwner = idOwner;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}
	
	public void setAddDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.addDate = sqlDate;
	}

	public void setEditDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.editDate = sqlDate;
	}

	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public List<QuestionCreateDTO> getQuestions() {
		return questions;
	}

	public void setQuestions(List<QuestionCreateDTO> questions) {
		this.questions = questions;
	}
    
    
}
