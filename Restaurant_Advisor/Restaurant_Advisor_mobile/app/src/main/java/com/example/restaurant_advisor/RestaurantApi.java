package com.example.restaurant_advisor;

import com.sdk.drive.storetail.retrofitexemple.Auth;
import com.sdk.drive.storetail.retrofitexemple.Register;
import com.sdk.drive.storetail.retrofitexemple.Restaurants;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface RestaurantApi {

    @POST("api/auth")
    Call<ResponseBody> postLogin(@Body Auth auth);

    @POST("api/register")
    Call<ResponseBody> postRegister(@Body Register register);

    @GET("api/users")
    Call<List<String>> getUsers(@Body Register users);

    @GET("api/restaurants")
    Call<List<Restaurants>> getRestaurants();
}
