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

@Entity
public class Answer {

    
	@Id
	@Column(name="id_ans")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String content;
    @Column(name="is_good")
    @JsonProperty("is_good")
    private boolean isGood;
    
    @Transient
    @JsonIgnore
    @JsonProperty("good")
    private boolean SHUTUP;

    @ManyToOne
    @JoinColumn(name="id_question",referencedColumnName="id")
    @JsonBackReference
    private Question question;
    
    public Answer() {
		super();
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
		return isGood;
	}

	public void setGood(boolean isGood) {
		this.isGood = isGood;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}
    
    
}
