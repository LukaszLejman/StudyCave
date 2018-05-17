package studycave.application.test;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import springfox.documentation.annotations.ApiIgnore;

@Entity
public class Answer {

    
	@Id
	@Column(name="id_ans")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String content;
    

    @Column(name="is_good")
    @JsonProperty("is_good")
    private boolean good;
    
    @ApiModelProperty(hidden = true)
    @ManyToOne
    @JoinColumn(name="id_question",referencedColumnName="id")
    @JsonBackReference
    private Question question;
    
    public Answer() {
		super();
	}


	public void setQuestion(Question question) {
		this.question = question;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public boolean isGood() {
		return good;
	}


	public void setGood(boolean good) {
		this.good = good;
	}


	public Question getQuestion() {
		return question;
	}    
}
