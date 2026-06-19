<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use App\Mail\ProductNotificationMail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;

class ProductNotificationJob implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Product $product, public User $user, public string $action)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->user->email)->send(new ProductNotificationMail($this->product, $this->action));
    }
}
