package com.example.restaurant_advisor;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.android.material.snackbar.Snackbar;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sdk.drive.storetail.retrofitexemple.Auth;
import com.sdk.drive.storetail.retrofitexemple.Register;

import java.io.IOException;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {
    private final String TAG = "LoginActivity";
    private static RestaurantApi restaurantApi;
    private EditText editTextLogin;
    private EditText editTextPassword;
    private SharedPreferences Token;
    private SharedPreferences.Editor Editor;
    private String token;
    private Button buttonLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        editTextLogin = findViewById(R.id.editLogin);
        editTextPassword = findViewById(R.id.editPassword);
        buttonLogin = findViewById(R.id.loginbutton);

        editTextLogin.addTextChangedListener(loginTextWatcher);
        editTextPassword.addTextChangedListener(loginTextWatcher);

        this.configureRetrofit();

        Token = PreferenceManager.getDefaultSharedPreferences(this);

        Button buttonLogin = findViewById(R.id.loginbutton);

        buttonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                editTextLogin = findViewById(R.id.editLogin);
                editTextPassword = findViewById(R.id.editPassword);

                Auth auth = new Auth();
                auth.setLogin(editTextLogin.getText().toString().trim());
                auth.setPassword(editTextPassword.getText().toString().trim());
                login(auth);
            }
        });
    }
    private TextWatcher loginTextWatcher = new TextWatcher() {
        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
            String usernameInput = editTextLogin.getText().toString().trim();
            String passwordInput = editTextPassword.getText().toString().trim();

            buttonLogin.setEnabled(!usernameInput.isEmpty() && !passwordInput.isEmpty());


        }

        @Override
        public void afterTextChanged(Editable s) {

        }
    };

    private void login(Auth auth) {
        Call<ResponseBody> call = restaurantApi.postLogin(auth);

        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) {
                    String msg = "login is correct";
                    try {
                        Snackbar.make(findViewById(R.id.activity_login) , response.body().string(), Snackbar.LENGTH_LONG).show();
                        Intent intent = new Intent(getApplicationContext(), RestaurantsActivity.class);
                        startActivity(intent);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                } else {
                    String msg = "login not correct";
                    try {
                        Snackbar.make(findViewById(R.id.activity_login) , response.body().string(), Snackbar.LENGTH_LONG).show();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Snackbar.make(findViewById(R.id.activity_login) , t.getMessage().toString(), Snackbar.LENGTH_LONG).show();
            }
        });
    }

    public String getToken(String token) {
        String authToken = Token.getString("token", "default");
        return authToken;
    }
    public void deleteToken() {
        Editor.remove("token");
        Editor.apply();
    }
    public void setToken(String token) {
        Editor.putString("token", "default");
        Editor.commit();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_login:
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

        Retrofit retrofit = new Retrofit.Builder().baseUrl("http://192.168.1.14:8000/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        restaurantApi = retrofit.create(RestaurantApi.class);
    }
}
