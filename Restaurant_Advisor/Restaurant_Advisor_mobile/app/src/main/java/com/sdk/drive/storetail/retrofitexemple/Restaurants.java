package com.sdk.drive.storetail.retrofitexemple;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class Restaurants {

    @SerializedName("id")
    @Expose
    private String id;

    @SerializedName("name")
    @Expose
    private String name;

    @SerializedName("description")
    @Expose
    private String description;

    @SerializedName("grade")
    @Expose
    private Float grade;

    @SerializedName("localization")
    @Expose
    private String localization;

    @SerializedName("phone_number")
    @Expose
    private String phone_number;

    @SerializedName("website")
    @Expose
    private String website;

    @SerializedName("hours")
    @Expose
    private String hours;

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Float getGrade() { return grade; }

    public void setGrade(Float grade) { this.grade = grade; }

    public String getLocalization() { return localization; }

    public void setLocalization(String localization) { this.localization = localization; }

    public String getPhone_number() { return phone_number; }

    public void setPhone_number(String phone_number) { this.phone_number = phone_number; }

    public String getWebsite() { return website; }

    public void setWebsite(String website) { this.website = website; }

    public String getHours() { return hours; }

    public void setHours(String hours) { this.hours = hours; }
}
