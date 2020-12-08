package com.example.restaurant_advisor;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sdk.drive.storetail.retrofitexemple.MyListViewAdapter;
import com.sdk.drive.storetail.retrofitexemple.Restaurants;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class RestaurantsActivity extends AppCompatActivity {

    private final String TAG = "RestaurantsActivity";
    private static RestaurantApi restaurantApi;
    private ListView RestaurantsListView;
    private List<Restaurants> restaurant;
    private MyListViewAdapter myListViewAdapter;
    private ListView listView;
    private Button addRestaurantBtn;
    private EditText editText;
    private Integer ID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_restaurants);

        restaurant = new ArrayList<>();
        this.listView = (ListView) findViewById(R.id.listView);
        this.addRestaurantBtn = (Button) findViewById(R.id.buttonAddRestaurant);
        this.editText = (EditText) findViewById(R.id.et_restname);
        this.myListViewAdapter = new MyListViewAdapter(getApplicationContext(), restaurant);
        this.listView.setAdapter(myListViewAdapter);


        myListViewAdapter.notifyDataSetChanged();

        addRestaurantBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                String name = editText.getText().toString().trim();

                Restaurants restaurants1 = new Restaurants();
                restaurants1.setName(name);

                Random random = new Random(); //Ca parle de random
                ID = random.nextInt(10); // La variable ID est égale à une valeur entre 0 est 10
                String stringID=String.valueOf(ID); // ID devient stringID
                restaurants1.setId(stringID); //stringID est utilisé héhé
                /*
                On n'aura qu'a faire en sorte que si (tant que) la valeur obtenue est égale à l'un des id de notre bdd,
                on re tappe un random.
                Mais j'avoue c pas ouf.. Sinon si tu trouves un moyen de voir quel est l'id de la bdd le plus grand et à chaque fois créer ca + 1
                Faudra pas oublier de supprimer ces lignes de code avant de rendre!!

                Meillure idée : pourquoi ne pas laisser la base de données incrémeter d'elle même puis prendre le résultat ? Après jsp comment faire xD.
                 */

                restaurant.add(restaurants1);

                myListViewAdapter.notifyDataSetChanged();



            }
        });

        this.configureRetrofit();
        getRestaurantsViaAPI();
    }

    private void getRestaurantsViaAPI() {
        restaurantApi.getRestaurants().enqueue(new Callback<List<Restaurants>>() {
            @Override
            public void onResponse(Call<List<Restaurants>> call, Response<List<Restaurants>> response) {
                Log.d(TAG, "onResponse:");

                List<Restaurants> restaurantsList = response.body();
                if (restaurantsList != null) {

                    for(Restaurants restaurants: restaurantsList){
                        restaurant.add(restaurants);
                    }
                } else {
                    Log.d(TAG, "onResponse: restaurants is empty: " + response.body().toString());
                }
            }

            @Override
            public void onFailure(Call<List<Restaurants>> call, Throwable t) {
                Log.e(TAG, "onFailure: " + t.getMessage());
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
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
