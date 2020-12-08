package com.example.restaurant_advisor;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.android.material.snackbar.Snackbar;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sdk.drive.storetail.retrofitexemple.Register;

import java.io.IOException;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {
    private final String TAG = "MainActivity";
    private static RestaurantApi restaurantApi;
    private EditText editText;
    private EditText editText2;
    private EditText editText3;
    private EditText editText4;
    private EditText editText5;
    private EditText editText6;
    private EditText editText7;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.configureRetrofit();

        Button buttonRegister = findViewById(R.id.buttonRegister);

        buttonRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                editText = findViewById(R.id.editTextLogin);
                editText2 = findViewById(R.id.editTextPassword);
                editText3 = findViewById(R.id.editTextEmail);
                editText4 = findViewById(R.id.editTextName);
                editText5 = findViewById(R.id.editTextFirstname);
                editText6 = findViewById(R.id.editTextAge);
                editText7 = findViewById(R.id.editTextCpassword);

                Register register1 = new Register();
                if (!editText.getText().toString().trim().equals("")) {
                    register1.setLogin(editText.getText().toString().trim());
                }
                if (!editText4.getText().toString().trim().equals("")) {
                    register1.setName(editText4.getText().toString().trim());
                }
                if (!editText3.getText().toString().trim().equals("")) {
                    register1.setEmail(editText3.getText().toString().trim());
                }
                if (!editText5.getText().toString().trim().equals("")) {
                    register1.setFirstname(editText5.getText().toString().trim());
                }
                if (!editText2.getText().toString().trim().equals("")) {
                    if (editText7.getText().toString().trim().equals(editText2.getText().toString().trim())){
                        register1.setPassword(editText2.getText().toString().trim());
                    }
                }
                if (!editText6.getText().toString().trim().equals("")) {
                    register1.setAge(Integer.parseInt(editText6.getText().toString()));
                }
                addUser(register1);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    private void addUser(Register register) {
        Call<ResponseBody> call = restaurantApi.postRegister(register);
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) {
                    String msg = "register";
                    Snackbar.make(findViewById(R.id.activity_main) , msg, Snackbar.LENGTH_LONG).show();
                    Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                    startActivity(intent);
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e(TAG, "onFailure: " + t.getMessage().toString());
                Snackbar.make(findViewById(R.id.activity_main) , t.getMessage().toString(), Snackbar.LENGTH_LONG).show();
            }
        });
    }

    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_login:
                /* DO EDIT */
                Intent login = new Intent(this, LoginActivity.class);
                startActivity(login);
                return true;
            case R.id.action_register:
                Intent register = new Intent(this, MainActivity.class);
                startActivity(register);
                return true;
            case R.id.action_home:
                Intent restaurant = new Intent(this, RestaurantsActivity.class);
                startActivity(restaurant);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void configureRetrofit() {
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();

        Retrofit retrofit = new Retrofit.Builder().baseUrl("http://127.0.0.1:8000/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        restaurantApi = retrofit.create(RestaurantApi.class);
    }
}
